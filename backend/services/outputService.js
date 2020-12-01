
module.exports = app =>{

    const saveOutputProduct = (req, res) =>{
        const output = { ...req.body}

        app.db('output').insert(output)
            .then(_ => res.status(201).send())
            .catch(erro => res.status(500).send('ERRO AO SALVAR SAÍDA'))
    }

    const getOutputProducts = (req, res) =>{
        app.db('output').select('saida_id','data_saida', 'codigo_produto', 'nome_produto', 'preco_custo', 'preco_venda', 'quantidade', 'total')
        .limit(10).offset((req.query.page - 1) * 10)
        .then(output => res.status(200).send(output))
        .catch(_ => res.status(500).send('ERRO AO BUSCAR PRODUTOS'))
    }

    const countOutputProducts = (req, res) =>{
        app.db('output').count()
        .then(count => res.status(200).send(count[0].count))
        .catch(_ => res.status(500).send('ERRO AO RETORNA O TAMANHO DE SAÍDA'))
    }

    const deleteOutputProduct = (req, res) =>{
        app.db('output').delete().where({saida_id: req.params.saida_id})
        .then(_ => res.status(200).send())
        .catch(_ => res.status(500).send('ERRO AO DELETAR SAÍDA'))
    }

    const searchOutputProducts = async (req, res)=>{
        const count = await app.db('output').count().where('data_saida', 'like', `%${req.query.date}%`)
        .catch(_ => res.status(500).send('ERRO AO RETORNA A QUANTIDADE DE SAÍDA POR PESQUISA'))

        const searchDateOutput = await app.db('output').where('data_saida', 'like', `%${req.query.date}%`)
        .limit(10).offset((req.query.page - 1) * 10)
        .catch(_ => res.status(500).send('ERRO AO RETORNAR BUSCA POR SAÍDA'))
        
        const data = {
            'count' : count[0].count,
            'searchOutputDate' : searchDateOutput
        }
        res.status(200).send(data)

    }

    return {saveOutputProduct, getOutputProducts, deleteOutputProduct, searchOutputProducts, countOutputProducts}
}