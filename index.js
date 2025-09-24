const express = require('express')
const app = express()
const { Pool } = require("pg");

app.listen(8080)

app.get("/",(req,res)=>{
    res.send("aaa")
})

const pool = new Pool({
  connectionString: 'postgresql://neondb_owner:npg_Cco3nqTpSg9I@ep-tiny-cloud-ad5dwyl7-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
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
