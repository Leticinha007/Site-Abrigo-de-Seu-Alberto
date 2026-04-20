-- Schema do banco de dados do Abrigo de Seu Alberto
-- Execute este arquivo antes de rodar o seed.js

CREATE TABLE IF NOT EXISTS dogs (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  idade VARCHAR(50),
  porte VARCHAR(50),
  sexo VARCHAR(20),
  personalidade TEXT,
  historia TEXT,
  imagem VARCHAR(255),
  destaque BOOLEAN DEFAULT false,
  para_adocao BOOLEAN DEFAULT false,
  para_apadrinhamento BOOLEAN DEFAULT false
);

CREATE TABLE IF NOT EXISTS dog_tags (
  id SERIAL PRIMARY KEY,
  dog_id INTEGER REFERENCES dogs(id) ON DELETE CASCADE,
  tag VARCHAR(100)
);
