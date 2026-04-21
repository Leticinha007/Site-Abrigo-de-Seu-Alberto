# 🐕 Abrigo de Seu Alberto - Site Institucional

[![Vercel](https://img.shields.io/badge/Frontend-Vercel-black?logo=vercel)](https://abrigodeseualberto.vercel.app)
[![Render](https://img.shields.io/badge/Backend-Render-46E3B7?logo=render&logoColor=white)](https://site-abrigo-de-seu-alberto-1.onrender.com)
[![GitHub last commit](https://img.shields.io/github/last-commit/Leticinha007/Site-Abrigo-de-Seu-Alberto)](https://github.com/Leticinha007/Site-Abrigo-de-Seu-Alberto/commits/main)
[![GitHub repo size](https://img.shields.io/github/repo-size/Leticinha007/Site-Abrigo-de-Seu-Alberto)](https://github.com/Leticinha007/Site-Abrigo-de-Seu-Alberto)

Site institucional desenvolvido para o **Abrigo de Seu Alberto**, uma organização que há mais de 20 anos resgata e cuida de cães abandonados em Jaboatão dos Guararapes/PE.

🔗 **Acesse o site:** [abrigodeseualberto.vercel.app](https://abrigodeseualberto.vercel.app)

---

## 📋 Sobre o Projeto

O Abrigo de Seu Alberto é uma instituição sem fins lucrativos que acolhe cerca de 100 cães resgatados de situações de abandono e maus-tratos. Este site foi desenvolvido para:

- **Conectar** pessoas interessadas em adotar ou apadrinhar os cães
- **Divulgar** a história e o trabalho do abrigo
- **Facilitar** doações e contribuições
- **Ampliar** o alcance e a visibilidade da causa animal

---

## 🛠️ Tecnologias Utilizadas

### Frontend
| Tecnologia | Descrição |
|------------|-----------|
| ![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white) | Estruturação semântica do site |
| ![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white) | Estilização, responsividade e animações |
| ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black) | Funcionalidades interativas, filtros e integração com API |
| ![Vercel](https://img.shields.io/badge/Vercel-000000?logo=vercel&logoColor=white) | Deploy e hospedagem do frontend |

### Backend
| Tecnologia | Descrição |
|------------|-----------|
| ![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white) | Servidor da aplicação |
| ![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white) | Framework para criação da API REST |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white) | Banco de dados relacional com 62 cães cadastrados |
| ![Render](https://img.shields.io/badge/Render-46E3B7?logo=render&logoColor=white) | Deploy e hospedagem do backend |

### Controle de Versão
| Tecnologia | Descrição |
|------------|-----------|
| ![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=white) | Controle de versão |
| ![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white) | Repositório e versionamento |

---

## ✨ Funcionalidades

### 🗄️ **API REST com Node.js + Express**
- Rotas públicas para busca de cães (`GET /api/caes`, `GET /api/caes/:id`)
- Rotas protegidas por autenticação para gerenciamento (`POST`, `PUT`, `DELETE`)
- Endpoint de saúde (`GET /health`)
- Banco de dados PostgreSQL com tabelas `dogs` e `dog_tags`

### 🔒 **Painel Administrativo**
- Interface visual em `/admin.html` protegida por chave secreta
- Adicionar, editar e remover cães sem necessidade de código
- Busca por nome e visualização completa dos cadastros

### ⚡ **Fallback Automático**
- O frontend tenta buscar os dados da API com timeout de 3 segundos
- Se a API estiver indisponível, carrega automaticamente os dados locais
- Garante que o site **nunca fique fora do ar**

### 📱 **Layout Responsivo**
- Design adaptado para desktop, tablet e mobile
- Menu hamburger para dispositivos móveis

### 🐕 **Página de Adoção**
- Catálogo com **62 cães** disponíveis
- Filtros dinâmicos por **porte, idade e sexo**
- Cards interativos com fotos e histórias
- Sistema de "Ler mais" para textos longos
- Formulário integrado ao WhatsApp

### 💛 **Página de Apadrinhamento**
- Cães disponíveis para apadrinhamento
- Informações sobre planos e benefícios
- Formulário de solicitação via WhatsApp

### 💰 **Página de Doações**
- Informações bancárias (PIX, PicPay, Apoia-se, PayPal)
- Categorias de doação (ração, medicamentos, produtos de limpeza)
- Pontos de arrecadação físicos
- Cupons de desconto parceiros (zee.NOW e Petz)

### 📖 **Página Sobre Nós**
- História emocionante do fundador Alberto Ribeiro
- Linha do tempo do abrigo
- Homenagem e legado
- Apresentação das atuais responsáveis

### 📞 **Página de Contato**
- Formulário integrado ao WhatsApp
- Informações de contato (telefone, e-mail, endereço)
- Links para redes sociais

---

## 🏗️ Arquitetura

```
Frontend (Vercel)          Backend (Render)          Banco de Dados
      │                          │                         │
abrigodeseualberto.vercel.app → API REST (Express) → PostgreSQL
      │                          │
      └── fallback automático ───┘
          (array local se API indisponível)
```

---

## 📁 Estrutura do Projeto

```
abrigo-seu-alberto/
│
├── 📄 index.html              # Página inicial com hero e destaques
├── 📄 adocao.html             # Catálogo de cães para adoção
├── 📄 apadrinhamento.html     # Cães para apadrinhamento
├── 📄 doacao.html             # Formas de contribuir
├── 📄 sobre.html              # História do abrigo
├── 📄 contato.html            # Formulário de contato
├── 📄 admin.html              # Painel administrativo (protegido)
│
├── 📁 css/
│   └── 🎨 estilo.css          # Estilos e responsividade
│
├── 📁 js/
│   └── ⚡ script.js           # Integração com API e fallback local
│
├── 📁 imagens/                # Fotos dos cães e assets
│
└── 📁 backend/
    ├── 🖥️ server.js           # API REST com Express
    ├── 🌱 seed.js             # Script para popular o banco
    ├── 🗄️ schema.sql          # Schema do banco de dados
    ├── 📄 .env.example        # Variáveis de ambiente necessárias
    └── 📦 package.json        # Dependências do projeto
```

---

## ⚙️ Como Rodar Localmente

### Pré-requisitos
- Node.js instalado
- PostgreSQL instalado

### Backend
```bash
cd backend
cp .env.example .env      # configure suas variáveis
psql -U postgres -c "CREATE DATABASE abrigo_caes;"
psql -U postgres -d abrigo_caes -f schema.sql
npm install
npm run seed              # popula o banco com os 62 cães
npm run dev               # inicia o servidor em localhost:3000
```

### Frontend
Abra o `index.html` no browser ou use a extensão Live Server no VS Code.

---

## 🔗 Links Úteis

| Recurso | Link |
|---------|------|
| **Site** | [abrigodeseualberto.vercel.app](https://abrigodeseualberto.vercel.app) |
| **API** | [site-abrigo-de-seu-alberto-1.onrender.com](https://site-abrigo-de-seu-alberto-1.onrender.com) |
| **GitHub** | [github.com/Leticinha007/Site-Abrigo-de-Seu-Alberto](https://github.com/Leticinha007/Site-Abrigo-de-Seu-Alberto) |
| **Instagram** | [@abrigodeseualberto](https://www.instagram.com/abrigodeseualberto) |
| **Facebook** | [Abrigo de Seu Alberto](https://www.facebook.com/abrigodeseualberto) |
| **WhatsApp** | [(81) 99920-4111](https://wa.me/5581999204111) |
| **E-mail** | [abrigodeseualbertoo@gmail.com](mailto:abrigodeseualbertoo@gmail.com) |
| **Apoia-se** | [apoia.se/abrigodeseualberto](https://apoia.se/abrigodeseualberto) |
| **PicPay** | [@abrigodeseualberto](https://picpay.me/abrigodeseualberto) |

---

🙏 **Agradecimentos**

Agradeço ao Abrigo de Seu Alberto pela confiança e por permitir que a tecnologia seja uma ferramenta de transformação social. E a todos que contribuem com doações, apadrinhamento e divulgação da causa animal.
