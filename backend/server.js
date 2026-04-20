require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool(
  process.env.DATABASE_URL
    ? { connectionString: process.env.DATABASE_URL, ssl: { rejectUnauthorized: false } }
    : {
        user: process.env.DB_USER,
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: process.env.DB_PASSWORD,
        port: process.env.DB_PORT || 5432,
      }
);

function verificarAdmin(req, res, next) {
  const chave = req.headers['x-admin-key'];
  if (!chave || chave !== process.env.ADMIN_KEY) {
    return res.status(401).json({ erro: 'Não autorizado' });
  }
  next();
}

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// ========== ROTAS PÚBLICAS ==========

app.get('/api/caes', async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT d.*,
             COALESCE(json_agg(t.tag) FILTER (WHERE t.tag IS NOT NULL), '[]') AS tags
      FROM dogs d
      LEFT JOIN dog_tags t ON t.dog_id = d.id
      GROUP BY d.id
      ORDER BY d.nome
    `);
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar cães' });
  }
});

app.get('/api/caes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query(`
      SELECT d.*,
             COALESCE(json_agg(t.tag) FILTER (WHERE t.tag IS NOT NULL), '[]') AS tags
      FROM dogs d
      LEFT JOIN dog_tags t ON t.dog_id = d.id
      WHERE d.id = $1
      GROUP BY d.id
    `, [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Cão não encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao buscar cão' });
  }
});

// ========== ROTAS ADMIN (exigem x-admin-key) ==========

app.post('/api/caes', verificarAdmin, async (req, res) => {
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

    res.status(201).json({ mensagem: 'Cão adicionado com sucesso', id: novoId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao adicionar cão' });
  }
});

app.delete('/api/caes/:id', verificarAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM dogs WHERE id = $1 RETURNING nome', [id]);

    if (result.rows.length === 0) {
      return res.status(404).json({ erro: 'Cão não encontrado' });
    }

    res.json({ mensagem: `${result.rows[0].nome} removido com sucesso` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao remover cão' });
  }
});

app.put('/api/caes/:id', verificarAdmin, async (req, res) => {
  try {
    const { id } = req.params;
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

    res.json({ mensagem: 'Cão atualizado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao atualizar cão' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
