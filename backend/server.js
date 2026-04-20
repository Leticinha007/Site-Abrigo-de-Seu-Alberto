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

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
