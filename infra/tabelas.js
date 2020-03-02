class Tabelas{
    init(conexao){
        this.conexao = conexao;   
        this.criarAtendimento();
    }

    criarAtendimento(){
        const sql = 'CREATE TABLE IF NOT EXISTS Atendimentos (id serial NOT NULL PRIMARY KEY, client varchar(50) unique NOT NULL, pet varchar(20) NOT NULL, servico varchar(20) NOT NULL, status varchar(20) NOT NULL, observacoes text, data date NOT NULL, datacriacao date NOT NULL)'

        this.conexao.query(sql, (erro) => {
            if(erro){
                console.log('Erro ao add table'+erro);
            }else{
                console.log('Table criado');
                
            }
        });
    }
}

module.exports = new Tabelas;