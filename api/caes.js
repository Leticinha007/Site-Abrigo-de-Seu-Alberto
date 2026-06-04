const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

function verificarAdmin(req) {
  const chave = req.headers['x-admin-key'];
  return chave && chave === process.env.ADMIN_KEY;
}

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key');

  if (req.method === 'OPTIONS') return res.status(200).end();

  if (req.method === 'GET') {
    try {
      const result = await pool.query(`
        SELECT d.*,
               COALESCE(json_agg(t.tag) FILTER (WHERE t.tag IS NOT NULL), '[]') AS tags
        FROM dogs d
        LEFT JOIN dog_tags t ON t.dog_id = d.id
        GROUP BY d.id
        ORDER BY d.nome
      `);
      return res.json(result.rows);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao buscar cães' });
    }
  }

  if (req.method === 'POST') {
    if (!verificarAdmin(req)) return res.status(401).json({ erro: 'Não autorizado' });
    try {
      const { nome, idade, porte, sexo, personalidade, historia, imagem, destaque, para_adocao, para_apadrinhamento, tags } = req.body;
      const result = await pool.query(`
        INSERT INTO dogs (nome, idade, porte, sexo, personalidade, historia, imagem, destaque, para_adocao, para_apadrinhamento)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)
        RETURNING id
      `, [nome, idade, porte, sexo, personalidade, historia, imagem, destaque ?? false, para_adocao ?? false, para_apadrinhamento ?? false]);

      const novoId = result.rows[0].id;
      if (tags && tags.length > 0) {
        for (const tag of tags) {
          await pool.query('INSERT INTO dog_tags (dog_id, tag) VALUES ($1, $2)', [novoId, tag]);
        }
      }
      return res.status(201).json({ mensagem: 'Cão adicionado com sucesso', id: novoId });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao adicionar cão' });
    }
  }

  res.status(405).json({ erro: 'Método não permitido' });
};
