// database.js
const { Pool } = require('pg');

// Conexão do banco de dados
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'banco_de_dados',
    password: '123',
    port: 5432,
});

module.exports = pool;
