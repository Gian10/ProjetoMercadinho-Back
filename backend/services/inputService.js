const query = require('../querys/query')

module.exports = app =>{

    const saveInputProduct = (req, res) =>{
        const input = { ...req.body}
        
        app.db('input_product').insert(input).returning('entrada_id')
        .then(id => res.status(201).send(id))
        .catch(erro => res.status(500).send('ERRO AO SALVAR ENTRADA'))        
    }

    const getInputProducts = (req, res) =>{
        app.db('input_product').select('entrada_id','data_entrada', 'codigo_produto', 'nome_produto', 'preco_custo', 'preco_venda', 'quantidade', 'total')
        .limit(10).offset((req.query.page - 1) * 10)
        .then(input => res.status(200).send(input))
        .catch(_ => res.status(500).send('ERRO AO BUSCAR DADOS DE ENTRADA DE PRODUTO'))
    }

    const deleteInputProducts = (req, res) =>{
        app.db('input_product').delete().where({entrada_id: req.params.entrada_id})
        .then(_ => res.status(200).send())
        .catch(_ => res.status(500).send('ERRO AO DELETAR ENTRADA'))
    }

    const searchDateInputProducts = async (req, res) =>{
        const countSearch = await app.db('input_product').count().where('data_entrada', 'like', `%${req.query.date}%`)
        .catch(_ => res.status(500).send('ERRO AO RETORNA A QUANTIDADE DE ENTRADA POR PESQUISA')) 

        const searchInput = await app.db('input_product').where('data_entrada', 'like', `%${req.query.date}%`).limit(10).offset((req.query.page - 1) * 10)
        .catch(_ => res.status(500).send('ERRO AO BUSCAR ENTRADA PRO DATA'))
        
        const data = {
            'nRecords' : countSearch[0].count,
            'searchInputProducts' : searchInput       
        }
        res.status(200).send(data)
    }

    const countInputProducts = async (req, res) =>{
        await app.db.raw(query.entradaQtd)
        .then(count => res.status(200).send(count.rows[0]))
        .catch(_ => res.status(500).send('ERRO AO BUSCAR DADOS DE ENTRADA DE PRODUTO'))
    }

    
    return {saveInputProduct, getInputProducts, deleteInputProducts, searchDateInputProducts, countInputProducts}
}