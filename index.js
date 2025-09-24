const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    require: true,           // força uso de SSL
    rejectUnauthorized: false // ignora self-signed na cadeia
  }
});

async function testConnection() {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("Conexão bem sucedida:", res.rows[0]);
  } catch (err) {
    console.error("Erro na conexão:", err);
  }
}

testConnection();

