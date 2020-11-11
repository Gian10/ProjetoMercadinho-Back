
module.exports = app =>{

    const save = (req, res) =>{
        const output = { ...req.body}

        app.db('output').insert(output)
            .then(_ => res.status(201).send())
            .catch(erro => res.status(500).send('erro ao salvar saida'))
    }

    const getOutput = (req, res) =>{
        app.db('output')
            .select('saida_id','data_saida', 'produto_codigo', 'produto_nome', 'preco_custo', 'preco_venda', 'quantidade', 'total')
            .then(output => res.status(200).send(output))
            .catch(erro => res.status(500).send(erro))

    }

    const deleteOutput = (req, res) =>{
        app.db('output').delete().where({saida_id: req.params.saida_id})
        .then(_ => res.status(200).send())
        .catch(_ => res.status(500).send('erro ao deletar saida'))
    }


    return {save, getOutput, deleteOutput}
}