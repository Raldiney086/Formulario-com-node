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
    password: '123',
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
    const { nome, email, senha } = req.body;

    try {
        const query = `INSERT INTO users (nome, email,senha) VALUES ('${nome}','${email}','${senha}')`;
        await pool.query(query);
        res.send(`Dados inseridos com sucesso!` );
       
    } catch (error) {
        console.error(error);
        res.send('Erro ao inserir dados.' , error);
    }
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
