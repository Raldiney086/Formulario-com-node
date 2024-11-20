require('dotenv').config();
const { Pool } = require('pg');
 // Importa o cliente do PostgreSQL

// Configura o cliente PostgreSQL
const pool = new Pool({
    host: process.env.PGHOST,
    user: process.env.PGUSER,
    password: String(process.env.PGPASSWORD),
    database: process.env.PGDATABASE,
    port: process.env.PGPORT,
  });

// Conecta ao banco de dados
pool.connect()
    .then(() => console.log('Conectado ao PostgreSQL com sucesso!'))
    .catch(err => console.error('Erro ao conectar ao PostgreSQL:', err));

    if (typeof process.env.PG_PASSWORD !== 'string') {
        throw new Error('Senha inválida. Certifique-se de que é uma string.');
    }
    
module.exports = pool;