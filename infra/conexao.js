const {Client} = require('pg');
const conexao = 'postgres://postgres:nyanya12@localhost:5432/agenda-petshop'

const client = new Client({
    connectionString: conexao
});

module.exports = client;