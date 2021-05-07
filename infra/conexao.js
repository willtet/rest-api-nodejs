const {Client} = require('pg');
const conexao = 'postgres://postgres:password@localhost:5432/agenda-petshop'

const client = new Client({
    connectionString: conexao
});

module.exports = client;
