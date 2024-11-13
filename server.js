const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuração do banco de dados Postgre
const pool = new Pool({
    user: 'postgres', 
    host: 'localhost',
    database: 'banco_de_dados', 
    password: '2024', 
    port: 5432,
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

// Rota para exibir o formulário
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/formulario.html');
});

// Rota para receber dados do formulário e inserir no banco de dados
app.post('/submit', async (req, res) => {
    const { name, email } = req.body;

    try {
        const query = 'INSERT INTO users (name, email) VALUES ($1, $2)';
        await pool.query(query, [name, email]);
        res.send('Dados inseridos com sucesso!');
    } catch (error) {
        console.error(error);
        res.send('Erro ao inserir dados.');
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
