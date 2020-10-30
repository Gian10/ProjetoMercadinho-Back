
module.exports = app =>{

    const save = (req, res) =>{
        const input = { ...req.body}
        
        app.db('input').insert(input)
        .then(_ => res.status(201).send('entrada salvo'))
        .catch(erro => res.status(500).send('erro ao salvar'))
    }

    const getInput = (req, res) =>{
        app.db('input')
        .select('entradaId','dataEntrada', 'produtoCodigo', 'produtoNome', 'precoCusto', 'precoVenda', 'quantidade', 'total')
        .then(input => res.status(200).send(input))
        .catch(erro => res.status(500).send(erro))
    }
    return {save, getInput}
}