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
  res.setHeader('Access-Control-Allow-Methods', 'GET, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-admin-key');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const result = await pool.query(`
        SELECT d.*,
               COALESCE(json_agg(t.tag) FILTER (WHERE t.tag IS NOT NULL), '[]') AS tags
        FROM dogs d
        LEFT JOIN dog_tags t ON t.dog_id = d.id
        WHERE d.id = $1
        GROUP BY d.id
      `, [id]);

      if (result.rows.length === 0) return res.status(404).json({ erro: 'Cão não encontrado' });
      return res.json(result.rows[0]);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao buscar cão' });
    }
  }

  if (req.method === 'DELETE') {
    if (!verificarAdmin(req)) return res.status(401).json({ erro: 'Não autorizado' });
    try {
      const result = await pool.query('DELETE FROM dogs WHERE id = $1 RETURNING nome', [id]);
      if (result.rows.length === 0) return res.status(404).json({ erro: 'Cão não encontrado' });
      return res.json({ mensagem: `${result.rows[0].nome} removido com sucesso` });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao remover cão' });
    }
  }

  if (req.method === 'PUT') {
    if (!verificarAdmin(req)) return res.status(401).json({ erro: 'Não autorizado' });
    try {
      const { nome, idade, porte, sexo, personalidade, historia, imagem, destaque, para_adocao, para_apadrinhamento, tags } = req.body;
      await pool.query(`
        UPDATE dogs SET nome=$1, idade=$2, porte=$3, sexo=$4, personalidade=$5,
          historia=$6, imagem=$7, destaque=$8, para_adocao=$9, para_apadrinhamento=$10
        WHERE id = $11
      `, [nome, idade, porte, sexo, personalidade, historia, imagem, destaque, para_adocao, para_apadrinhamento, id]);

      if (tags) {
        await pool.query('DELETE FROM dog_tags WHERE dog_id = $1', [id]);
        for (const tag of tags) {
          await pool.query('INSERT INTO dog_tags (dog_id, tag) VALUES ($1, $2)', [id, tag]);
        }
      }
      return res.json({ mensagem: 'Cão atualizado com sucesso' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ erro: 'Erro ao atualizar cão' });
    }
  }

  res.status(405).json({ erro: 'Método não permitido' });
};
