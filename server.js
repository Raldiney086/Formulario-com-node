const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

// Configuração do banco de dados PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'banco_de_dados',
    password: '123',
    port: 5432,
});

// Middleware para interpretar dados do formulário
app.use(bodyParser.urlencoded({ extended: true }));

// Rota GET para exibir o formulário
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/formulario.html');
});

// Rota POST para receber dados do formulário e inserir no banco de dados
app.post('/submit', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        // Consulta para verificar se o email já existe no banco de dados
        const query_consulta_email = `SELECT * FROM users WHERE email = $1`;
        const resultado = await pool.query(query_consulta_email, [email]);

        if (resultado.rows.length > 0) {
            // Se encontrar um resultado, significa que o email já existe
            console.log("Email já existe");
            res.send("Esse email já está cadastrado.");
        } else {
            // Se o email não existir, insere os dados no banco
            const query_insert = `INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3)`;
            await pool.query(query_insert, [nome, email, senha]);
            res.send("Dados inseridos com sucesso!");
        }
    } catch (error) {
        console.error("Erro ao inserir dados:", error);
        res.send("Erro ao inserir dados.");
    }
});

// Rota GET para buscar um usuário pelo email
// Rota GET para buscar um usuário pelo email
app.get('/get', async (req, res) => {
    const { email, senha } = req.query; // Recebe o email e senha via parâmetros da URL

    console.log(`Email: ${email}, Senha: ${senha}`); // Log para verificação

    try {
        // Consulta para verificar se o email existe
        const query = `SELECT * FROM users WHERE email = $1`;
        const resultado = await pool.query(query, [email]);

        if (resultado.rows.length === 0) {
            // Caso não exista nenhum usuário com esse email
            res.send("Usuário não encontrado.");
        } else {
            // Se o email existir, verifica se a senha está correta
            const usuario = resultado.rows[0];
            console.log('Usuário encontrado:'); // Log para verificação

            if (usuario.senha === senha) {
                res.sendFile(__dirname+"/logado.html")
            } else {
                res.send("Senha incorreta."); // Retorna "Senha incorreta" se a senha não corresponder
            }
        }
    } catch (error) {
        console.error("Erro ao validar dados:", error);
        res.send("Erro ao validar dados.");
    }
});

app.get('/log',async (req,res)=>{
    res.sendFile(__dirname+'/formulario.html')
})


app.get('/reg',async (req,res)=>{
    res.sendFile(__dirname+'/registro.html')
})

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
