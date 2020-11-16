
module.exports = app =>{

    const save = (req, res) =>{
        const input = { ...req.body}
        
        app.db('input').insert(input).returning('entrada_id')
        .then(id => res.status(201).send(id))
        .catch(erro => res.status(500).send('erro ao salvar'))        
    }

    const getInput = (req, res) =>{
        app.db('input')
        .select('entrada_id','data_entrada', 'codigo_produto', 'nome_produto', 'preco_custo', 'preco_venda', 'quantidade', 'total')
        .then(input => res.status(200).send(input))
        .catch(erro => res.status(500).send(erro))
    }

    const deleteInput = (req, res) =>{
        app.db('input').delete().where({entrada_id: req.params.entrada_id})
        .then(_ => res.status(200).send())
        .catch(_ => res.status(500).send('erro ao deletar entrada'))
    }

    const searchDateInput = (req, res) =>{
        app.db('input').where('data_entrada', 'like', `%${req.query.date}%`)
        .then(input => res.status(200).send(input))
        .catch(erro => res.status(500).send('erro ao buscar entrada pela data'))
    }

    
    return {save, getInput, deleteInput, searchDateInput}
}