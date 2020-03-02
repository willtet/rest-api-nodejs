const Atendimentos = require('../models/atendimentos');

module.exports = app =>{
    app.get('/atendimentos',(req, res)=>{
        Atendimentos.lista(res);
    });
    
    app.get('/atendimentos/:id',(req, res)=>{
        const id = parseInt(req.params.id);
        Atendimentos.listaPorId(res,id);
    });


    app.post('/atendimentos', (req,res) => {
        const atendimentos = req.body;
        Atendimentos.adiciona(atendimentos,req,res);
    });
    
    app.patch('/atendimentos/:id', (req,res)=>{
        const id = parseInt(req.params.id);
        const valores = req.body;
        Atendimentos.alterar(id,valores,res,req);
    })

    app.delete('/atendimentos/:id',(req,res)=>{
        const id = parseInt(req.params.id);
        const valores = req.body;
        Atendimentos.deletar(id,res);
    })
    
}