
module.exports = app =>{

    const save = (req, res) =>{
        const product = { ...req.body}

        if(req.params.id){
            product.id = req.params.id
        }

        if(product.id){
            app.db('product').update(product).where({id: product.id})
            .then(_ => res.status(201).send('produto atualizado'))
            .catch(erro => res.status(500).send('erro ao atualizar'))
        }else{
            app.db('product').insert(product)
            .then(product => res.status(201).send('salvo com sucesso'))
            .catch(erro => res.status(500).send('erro ao salvar'))
        }
    }

    const getProduct = (req, res) =>{
        app.db('product')
        .select('id', 'nomeProduto', 'codigo', 'precoCusto', 'precoVenda', 'estoque')
        .then(product => res.status(200).send(product))
        .catch(erro => res.status(500).send('erro ao buscar produto'))

    }

    const getByIdProduct = (req, res) =>{
        app.db('product')
        .select('id', 'nomeProduto', 'codigo', 'precoCusto', 'precoVenda', 'estoque')
        .where({id: req.params.id})  
        .then(product => res.status(200).send(product))
        .catch(erro => res.status(500).send('erro ao buscar produto por id'))      
    }

    const deleteProduct = async (req, res) =>{
        app.db('product').delete().where({id: req.params.id})
        .then(_ => res.status(200).send('produto deletado'))
        .catch(_ => res.status(500).send('erro ao deletar produto'))
    }

    return {save, getProduct, getByIdProduct, deleteProduct}
}