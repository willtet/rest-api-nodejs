const customExpress = require('./config/customExpress');
const conexao = require('./infra/conexao');
const Tabelas = require('./infra/tabelas');

conexao.connect(erro =>{
    if(erro){
        console.log(erro);
    }else{
        console.log('Conexao PG Ok');

        Tabelas.init(conexao);


        const app = customExpress;
        app.listen(3000,()=>{
            console.log("console rodando"); 
        });
    }
});


