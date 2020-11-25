const query = require('../querys/query')

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
        .catch(erro => res.status(500).send('erro ao buscar dados'))
    }

    const deleteInput = (req, res) =>{
        app.db('input').delete().where({entrada_id: req.params.entrada_id})
        .then(_ => res.status(200).send())
        .catch(_ => res.status(500).send('erro ao deletar entrada'))
    }

    const searchDateInput = async (req, res) =>{
        const countSearch = await app.db('input').count().where('data_entrada', 'like', `%${req.query.date}%`) 
        const searchInput = await app.db('input').where('data_entrada', 'like', `%${req.query.date}%`).limit(10).offset((req.query.page - 1) * 10)
        .catch(_ => res.status(500).send('erro ao buscar entradas por data'))
        
        const data = {
            "input" : {
                'countSearch' : countSearch,
                'searchInput' : searchInput
            }
        }
        res.status(200).send(data)
    }

    const page = (req, res) =>{
        app.db('input').select('entrada_id','data_entrada', 'codigo_produto', 'nome_produto', 'preco_custo', 'preco_venda', 'quantidade', 'total')
        .limit(10).offset((req.query.page - 1) * 10)
        .then(input => res.status(200).send(input))
        .catch(_ => res.status(500).send('erro ao buscar dados'))
    }

    const countInput = async (req, res) =>{
        await app.db.raw(query.entradaQtd)
        .then(count => res.status(200).send(count.rows[0]))
        .catch(_ => res.status(500).send('erro ao buscar dados'))
    }

    
    return {save, getInput, deleteInput, searchDateInput, page, countInput}
}