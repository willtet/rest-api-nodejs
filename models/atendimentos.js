const moment = require('moment');
const conexao = require('../infra/conexao');

class Atendimento{
    adiciona(atendimento,req,res){
        const data = {
            client: req.body.client,
            pet: req.body.pet,
            servico: req.body.servico,
            status: req.body.status,
            observacoes: req.body.observacoes,
            data: req.body.data,
            datacriacao: req.body.datacriacao
            
        }
        
        const dataFormatada = moment(atendimento.data,'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        const dataCriacaoFormatada = moment(atendimento.datacriacao,'DD/MM/YYYY').format('YYYY-MM-DD HH:MM:SS');
        
        const sameDate = moment(dataFormatada).isSameOrAfter(dataCriacaoFormatada);
        const clientLength = atendimento.client.length >= 5;

        console.log(dataCriacaoFormatada);
        

        const validacoes = [
            {
                nome:'data',
                valido: sameDate,
                mensagem: 'Campo data invalida'
            },
            {
                nome: 'Cliente',
                valido: clientLength,
                mensagem: 'Campo Nome Invalido'
            }
        ];

        const erros = validacoes.filter(campo => !campo.valido);
        const existeErrro =erros.length;

        
        if(existeErrro){
            res.status(400).json(erros);
        }else{
            const sql = 'INSERT INTO atendimentos(id,client, pet, servico, status, observacoes, data, datacriacao) VALUES (DEFAULT, $1, $2, $3, $4, $5, $6, $7)';
        
            conexao.query(sql,[data.client, data.pet, data.servico, data.status, data.observacoes, data.data, data.datacriacao],(erro, resultado)=>{
                if(erro){
                    res.status(400).json(erro);
                    
                }else{
                    res.status(200).json(resultado);
                    
                }
            });
        }
    }

    lista(res){
        const sql = 'SELECT * FROM Atendimentos'

        conexao.query(sql,(erro,resultado) => {
            if(erro){
                res.status(400).json(erro);
                
            }else{
                res.status(200).json(resultado.rows);
                
            }
        });
    }

    listaPorId(res,id){
        const sql = `SELECT * FROM Atendimentos WHERE id=${id}`

        conexao.query(sql,(erro,resultado) => {
            if(erro){
                res.status(400).json(erro);
                
            }else{
                res.status(200).json(resultado.rows[0]);
                
            }
        });
    }

    alterar(id, valores, res, req){

        const data = {
            client: req.body.client,
            pet: req.body.pet,
            servico: req.body.servico,
            status: req.body.status,
            observacoes: req.body.observacoes,
            data: req.body.data,
            datacriacao: req.body.datacriacao
            
        }

        const sql = 'UPDATE Atendimentos SET client=$1, pet=$2, servico=$3, status=$4, observacoes=$5, data=$6, datacriacao=$7 WHERE id=$8';
        
        conexao.query(sql,[data.client, data.pet, data.servico, data.status, data.observacoes, data.data, data.datacriacao,id],(erro,resultado) => {
            if(erro){
                res.status(400).json(erro);
                
            }else{
                res.status(200).json({...data,id});
                
            }
        })
    }

    deletar(id,res){
        const sql = `DELETE FROM Atendimentos WHERE id=${id}`

        conexao.query(sql,(erro,resultado) => {
            if(erro){
                res.status(400).json(erro);
                
            }else{
                res.status(200).json({id});
                
            }
        });
    }
}

module.exports = new Atendimento;