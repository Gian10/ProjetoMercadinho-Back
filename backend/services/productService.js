
module.exports = app =>{

    const saveProduct = (req, res) =>{
        const product = { ...req.body}

        if(req.params.produto_id){
            product.produto_id = req.params.produto_id
        }

        if(product.produto_id){
            app.db('product').update(product).where({produto_id: product.produto_id})
            .then(_ => res.status(201).send())
            .catch(erro => res.status(500).send('ERRO AO ATUALIZAR PRODUTO'))
        }else{
            app.db('product').insert(product)
            .then(product => res.status(201).send())
            .catch(erro => res.status(500).send('ERRO AO SALVAR PRODUTO'))
        }
    }

    const getProducts = async (req, res) =>{
        const products = await app.db('product')
        .select('produto_id', 'nome_produto', 'codigo_produto', 'preco_custo', 'preco_venda', 'estoque')
        .orderBy('produto_id').limit(10).offset((req.query.page - 1) * 10)
        .catch(_ => res.status(500).send('ERRO AO BUSCAR PRODUTOS'))

        const countProduct = await app.db('product').count()

        const productLength = {
            'countProducts' : countProduct[0].count,
            'products' : products
        } 
        res.send(productLength)
    } 

    const getByIdProduct = (req, res) =>{
        app.db('product')
        .select('produto_id', 'nome_produto', 'codigo_produto', 'preco_custo', 'preco_venda', 'estoque')
        .where({produto_id: req.params.produto_id})  
        .then(product => res.status(200).send(product))
        .catch(erro => res.status(500).send('ERRO AO BUSCAR PRODUTO PELO ID'))      
    }

    const deleteProduct = async (req, res) =>{
        app.db('product').delete().where({produto_id: req.params.produto_id})
        .then(_ => res.status(200).send())
        .catch(_ => res.status(500).send('ERRO AO DELETAR PRODUTO PELO ID'))
    }

    const searchProduct = async (req, res) =>{
        const productSearch = await app.db('product').where('nome_produto', 'like', `%${req.query.product}%`)
        .limit(10).offset((req.query.page - 1) * 10)
        .catch(_ => res.status(500).send('ERRO AO BUSCAR PESQUISA DE PRODUTO'))

        const countSearchProduct = await app.db('product').count().where('nome_produto', 'like', `%${req.query.product}%`)
        .catch(_ => res.status(500).send('ERRO AO BUSCAR O TAMANHO DA PESQUISA'))

        const searchProductCount = {
            'countProducts' : countSearchProduct[0].count,
            'products' : productSearch
        }
        
        res.status(200).send(searchProductCount)
       
    }

    return {saveProduct, getProducts, getByIdProduct, deleteProduct, searchProduct}
}