
module.exports = app =>{

    const save = (req, res) =>{
        const input = { ...req.body}
        
        app.db('input').insert(input)
        .then(_ => res.status(201).send('entrada salvo'))
        .catch(erro => res.status(500).send('erro ao salvar'))
    }

    const getInput = (req, res) =>{
        app.db('input')
        .select('entrada_id','data_entrada', 'produto_codigo', 'produto_nome', 'preco_custo', 'preco_venda', 'quantidade', 'total')
        .then(input => res.status(200).send(input))
        .catch(erro => res.status(500).send(erro))
    }

    const deleteInput = (req, res) =>{
        app.db('input').delete().where({entrada_id: req.params.entrada_id})
        .then(_ => res.status(200).send('entrada deletada'))
        .catch(_ => res.status(500).send('erro ao deletar entrada'))
    }
    return {save, getInput, deleteInput}
}