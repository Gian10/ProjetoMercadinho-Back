
module.exports = app =>{

// login
    app.route('/login')
        .post(app.authentication.auth.login) 
// validar token
    app.post('/validateToken', app.authentication.auth.validateToken)

    
        
// rotas de usuário
    app.route('/login/cadastroUser')
        .post(app.services.userService.saveUser)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .get(app.services.userService.getUsers)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(app.services.userService.saveUser)
        .get(app.services.userService.getByIdUser)



// rotas de produtos
    app.route('/products')
        .all(app.config.passport.authenticate())
        .post(app.services.productService.saveProduct)
        .get(app.services.productService.getProducts)

    app.route('/products/search')
        .get(app.services.productService.searchProduct)


    app.route('/products/:produto_id')
        .all(app.config.passport.authenticate())
        .get(app.services.productService.getByIdProduct)
        .put(app.services.productService.saveProduct)
        .delete(app.services.productService.deleteProduct)



// rota de entrada de produtos
    app.route('/input')
        .all(app.config.passport.authenticate())
        .get(app.services.inputService.getInputProducts)
        .post(app.services.inputService.saveInputProduct)

    app.route('/input/search')
        .all(app.config.passport.authenticate())
        .get(app.services.inputService.searchDateInputProducts)

    app.route('/input/count')
        .all(app.config.passport.authenticate())
        .get(app.services.inputService.countInputProducts)

    app.route('/input/:entrada_id')
        .all(app.config.passport.authenticate())
        .delete(app.services.inputService.deleteInputProducts)



// rota de saída de produtos
    app.route('/output')
        .all(app.config.passport.authenticate())
        .get(app.services.outputService.getOutputProducts)
        .post(app.services.outputService.saveOutputProduct)

    app.route('/output/search')
        .all(app.config.passport.authenticate())
        .get(app.services.outputService.searchOutputProducts)

    app.route('/output/count')
        .get(app.services.outputService.countOutputProducts)

    app.route('/output/:saida_id')
        .all(app.config.passport.authenticate())
        .delete(app.services.outputService.deleteOutputProduct)
 
        
    // rotas de soma de entrada e saída
    app.route('/sumTotalOutput')
        .all(app.config.passport.authenticate())
        .get(app.services.sumValueService.sumTotalOutput)

    app.route('/sumTotalInput')
        .all(app.config.passport.authenticate())
        .get(app.services.sumValueService.sumTotalInput)
}