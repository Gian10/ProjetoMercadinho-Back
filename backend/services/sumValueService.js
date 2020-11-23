const query = require('../querys/query')

module.exports = app=>{

    const sumTotalOutput = async (req, res) =>{
        await app.db.raw(query.somaSaida)
        .then(value => res.status(200).send(value.rows[0]))
        .catch(erro => res.status(500).send("erro ao somar saída"))
    }

    const sumTotalInput = async (req, res)=>{
        await app.db.raw(query.somaEntrada)
        .then(sum => res.status(200).send(sum.rows[0]))
        .catch(erro => res.status(500).send('erro ao somar entrada'))
    }
    return {sumTotalOutput, sumTotalInput}
}