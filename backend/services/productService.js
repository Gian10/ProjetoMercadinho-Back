
module.exports = app =>{

    const saveProduct = (req, res) =>{
        const product = { ...req.body}

        if(req.params.produto_id){
            product.produto_id = req.params.produto_id
        }

        if(product.produto_id){
            app.db('products').update(product).where({produto_id: product.produto_id})
            .then(_ => res.status(201).send())
            .catch(erro => res.status(500).send('ERRO AO ATUALIZAR PRODUTO'))
        }else{
            app.db('products').insert(product)
            .then(product => res.status(201).send())
            .catch(erro => res.status(500).send('ERRO AO SALVAR PRODUTO'))
        }
    }

    const getProducts = async (req, res) =>{
        const products = await app.db('products')
        .select('produto_id', 'nome_produto', 'codigo_produto', 'preco_custo', 'preco_venda', 'estoque')
        .where({usuario_id : req.query.usuario_id})
        .orderBy('produto_id').limit(10).offset((req.query.page - 1) * 10)
        .catch(_ => res.status(500).send('ERRO AO BUSCAR PRODUTOS'))

        const countProduct = await app.db('products').count().where({usuario_id : req.query.usuario_id})

        const productLength = {
            'countProducts' : countProduct[0].count,
            'products' : products
        } 
        res.send(productLength)
    } 

    const getByIdProduct = (req, res) =>{
        app.db('products')
        .select('produto_id', 'nome_produto', 'codigo_produto', 'preco_custo', 'preco_venda', 'estoque')
        .where({produto_id: req.params.produto_id})  
        .then(product => res.status(200).send(product))
        .catch(erro => res.status(500).send('ERRO AO BUSCAR PRODUTO PELO ID'))      
    }

    const deleteProduct = async (req, res) =>{
        app.db('products').delete().where({produto_id: req.params.produto_id})
        .then(_ => res.status(200).send())
        .catch(_ => res.status(500).send('ERRO AO DELETAR PRODUTO PELO ID'))
    }

    const searchProduct = async (req, res) =>{
        const productSearch = await app.db('products').where('nome_produto', 'like', `%${req.query.product}%`)
        .where({usuario_id : req.query.usuario_id})
        .limit(10).offset((req.query.page - 1) * 10)
        .catch(_ => res.status(500).send('ERRO AO BUSCAR PESQUISA DE PRODUTO'))

        const countSearchProduct = await app.db('products').count().where('nome_produto', 'like', `%${req.query.product}%`)
        .where({usuario_id : req.query.usuario_id})
        .catch(_ => res.status(500).send('ERRO AO BUSCAR O TAMANHO DA PESQUISA'))

        const searchProductCount = {
            'countProducts' : countSearchProduct[0].count,
            'products' : productSearch
        }
        res.status(200).send(searchProductCount)
    }

    return {saveProduct, getProducts, getByIdProduct, deleteProduct, searchProduct}
}