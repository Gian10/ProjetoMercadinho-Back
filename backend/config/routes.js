
module.exports = app =>{

// login
    app.route('/login')
        .post(app.authentication.auth.login) 
// validar token
    app.post('/validateToken', app.authentication.auth.validateToken)

        
// rotas de usuário
    app.route('/login/cadastroUser')
        .post(app.services.userService.save)

    app.route('/users')
        .all(app.config.passport.authenticate())
        .get(app.services.userService.getUsers)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .put(app.services.userService.save)
        .get(app.services.userService.getById)


// rotas de produtos
    app.route('/products')
        .all(app.config.passport.authenticate())
        .post(app.services.productService.save)
        .get(app.services.productService.getProduct)

    app.route('/products/:produto_id')
        .all(app.config.passport.authenticate())
        .get(app.services.productService.getByIdProduct)
        .put(app.services.productService.save)
        .delete(app.services.productService.deleteProduct)


// rota de entrada de produtos
    app.route('/input')
        .all(app.config.passport.authenticate())
        .get(app.services.inputService.getInput)
        .post(app.services.inputService.save)

    app.route('/input/:entrada_id')
        .all(app.config.passport.authenticate())
        .delete(app.services.inputService.deleteInput)


// rota de saída de produtos
    app.route('/output')
        .all(app.config.passport.authenticate())
        .get(app.services.outputService.getOutput)
        .post(app.services.outputService.save)

    app.route('/output/:saida_id')
        .all(app.config.passport.authenticate())
        .delete(app.services.outputService.deleteOutput)

    
}