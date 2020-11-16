
module.exports = app =>{

    const save = (req, res) =>{
        const product = { ...req.body}

        if(req.params.produto_id){
            product.produto_id = req.params.produto_id
        }

        if(product.produto_id){
            app.db('product').update(product).where({produto_id: product.produto_id})
            .then(_ => res.status(201).send())
            .catch(erro => res.status(500).send('erro ao atualizar'))
        }else{
            app.db('product').insert(product)
            .then(product => res.status(201).send())
            .catch(erro => res.status(500).send('erro ao salvar'))
        }
    }

    const getProduct = (req, res) =>{
        app.db('product')
        .select('produto_id', 'nome_produto', 'codigo_produto', 'preco_custo', 'preco_venda', 'estoque')
        .orderBy('produto_id')
        .then(product => res.status(200).send(product))
        .catch(erro => res.status(500).send('erro ao buscar produto'))
    }

    const getByIdProduct = (req, res) =>{
        app.db('product')
        .select('produto_id', 'nome_produto', 'codigo_produto', 'preco_custo', 'preco_venda', 'estoque')
        .where({produto_id: req.params.produto_id})  
        .then(product => res.status(200).send(product))
        .catch(erro => res.status(500).send('erro ao buscar produto por id'))      
    }

    const deleteProduct = async (req, res) =>{
        app.db('product').delete().where({produto_id: req.params.produto_id})
        .then(_ => res.status(200).send())
        .catch(_ => res.status(500).send('erro ao deletar produto'))
    }

    const searchProduct = (req, res) =>{
        app.db('product').where('nome_produto', 'like', `%${req.query.product}%`)
        .then(user => res.status(200).send(user))
        .catch(_ => res.status(500).send('erro'))
    }

    return {save, getProduct, getByIdProduct, deleteProduct, searchProduct}
}