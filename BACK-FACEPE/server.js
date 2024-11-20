const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;
const { Pool } = require('pg');
//parte conexão banco de dados   
// Configurações de conexão diretamente no código

/*const pool = new Pool({
  host: 'localhost',
  user: 'postgres',
  password: '2024',
  database: 'banco_principal',
  port: 5432,
});

// Conexão ao banco
pool.connect()
    .then(() => console.log('Conectado ao PostgreSQL com sucesso!'))
    .catch(err => console.error('Erro ao conectar ao PostgreSQL:', err));*/

//configuração servidor fetch e liberação cors 

module.exports = pool;
// Middleware para parsear JSON
app.use(express.json());

// Middleware para permitir CORS
app.use(cors());

// Rota para /api/empresas
app.post('/api/empresas', (req, res) => {
  const dados = req.body;
  console.log('Dados recebidos:', dados);

  // Aqui você pode adicionar a lógica para salvar os dados no banco de dados

  res.status(201).json({ message: 'Empresa cadastrada com sucesso!' });
});

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
