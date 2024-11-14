const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'banco_de_dados',
    password: '123',
    port: 5432,
});

app.use(express.static('public'));

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/formulario.html');
});

app.post('/submit', async (req, res) => {
    const { nome, email, senha } = req.body;

    try {
        const query_consulta_email = `SELECT * FROM users WHERE email = $1`;
        const resultado = await pool.query(query_consulta_email, [email]);

        if (resultado.rows.length > 0) {
            console.log("Email já existe");

            window.alert("Erro já esiste")
            res.sendFile(__dirname + "/formulario.html");

        } else {
            const query_insert = `INSERT INTO users (nome, email, senha) VALUES ($1, $2, $3)`;
            await pool.query(query_insert, [nome, email, senha]);
            res.sendFile(__dirname + "/logado.html");
        }
    } catch (error) {
        console.error("Erro ao inserir dados:", error);
        res.sendFile(__dirname);

    }
});


app.get('/get', async (req, res) => {
    const { email, senha } = req.query; 
    console.log(`Email: ${email}, Senha: ${senha}`); 

    try {
        
        const query = `SELECT * FROM users WHERE email = $1`;
        const resultado = await pool.query(query, [email]);

        if (resultado.rows.length === 0) {
         
            res.send("Usuário não encontrado.");
        } else {
            const usuario = resultado.rows[0];
            console.log('Usuário encontrado:'); 

            if (usuario.senha === senha) {
                res.sendFile(__dirname+"/logado.html")
            } else {
                res.send("Senha incorreta."); 
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

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
