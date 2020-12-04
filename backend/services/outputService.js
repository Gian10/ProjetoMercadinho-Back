
module.exports = app =>{

    const saveOutputProduct = (req, res) =>{
        const output = { ...req.body}

        app.db('output_product').insert(output)
            .then(_ => res.status(201).send())
            .catch(erro => res.status(500).send('ERRO AO SALVAR SAÍDA'))
    }

    const getOutputProducts = (req, res) =>{
        app.db('output_product').select('saida_id','data_saida', 'codigo_produto', 'nome_produto', 'preco_custo', 'preco_venda', 'quantidade', 'total')
        .where({usuario_id : req.query.usuario_id})
        .limit(10).offset((req.query.page - 1) * 10)
        .then(output => res.status(200).send(output))
        .catch(_ => res.status(500).send('ERRO AO BUSCAR SAÍDAS'))
    }

    const countOutputProducts = (req, res) =>{
        app.db('output_product').count().where({usuario_id : req.query.usuario_id})
        .then(count => res.status(200).send(count[0].count))
        .catch(_ => res.status(500).send('ERRO AO RETORNA O TAMANHO DE SAÍDA'))
    }

    const deleteOutputProduct = (req, res) =>{
        app.db('output_product').delete().where({saida_id: req.params.saida_id})
        .then(_ => res.status(200).send())
        .catch(_ => res.status(500).send('ERRO AO DELETAR SAÍDA'))
    }

    const searchOutputProducts = async (req, res)=>{
        const count = await app.db('output_product').count().where('data_saida', 'like', `%${req.query.date}%`)
        .where({usuario_id : req.query.usuario_id})
        .catch(_ => res.status(500).send('ERRO AO RETORNA A QUANTIDADE DE SAÍDA POR PESQUISA'))

        const searchDateOutput = await app.db('output_product').where('data_saida', 'like', `%${req.query.date}%`)
        .where({usuario_id : req.query.usuario_id})
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