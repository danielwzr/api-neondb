const express = require("express");
const { Pool } = require("pg");

const app = express();
app.use(express.json()); // permite receber JSON no body
app.use(express.urlencoded({ extended: true }));

// conexão com Neon
const pool = new Pool({
  connectionString: "postgresql://neondb_owner:npg_Cco3nqTpSg9I@ep-tiny-cloud-ad5dwyl7-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require",
  ssl: { rejectUnauthorized: false }
});

// rota GET → retorna todos os usuários
app.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar usuários");
  }
});

// rota POST → insere um usuário
app.post("/users", async (req, res) => {
  const { nome, email } = req.body; // exemplo de colunas
  try {
    const result = await pool.query(
      "INSERT INTO users (nome, email) VALUES ($1, $2) RETURNING *",
      [nome, email]
    );
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao inserir usuário");
  }
});

// inicia o servidor
app.listen(8080, () => {
  console.log("Servidor rodando em http://localhost:8080");
});


