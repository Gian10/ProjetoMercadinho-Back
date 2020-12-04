const query = require('../querys/query')

module.exports = app=>{

    const sumTotalOutput = async (req, res) =>{
        await app.db.raw(query.somaSaida, req.query.usuario_id)
        .then(value => res.status(200).send(value.rows[0]))
        .catch(erro => res.status(500).send('ERRO AO SOMAR DADOS DE SAÍDA'))
    }

    const sumTotalInput = async (req, res)=>{
        await app.db.raw(query.somaEntrada, req.query.usuario_id)
        .then(sum => res.status(200).send(sum.rows[0]))
        .catch(erro => res.status(500).send('ERRO AO SOMAR DADOS DE ENTRADA'))
    }
    return {sumTotalOutput, sumTotalInput}
}