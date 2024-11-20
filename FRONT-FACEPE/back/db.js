//Configuração da conexão com o PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'teste',
    password: 'raldiney13',
    port: 5432 
});
