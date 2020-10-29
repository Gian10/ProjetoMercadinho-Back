
module.exports = app =>{

    // login
    app.route('/login')
        .post(app.authentication.auth.login)
    
    // validar token
    app.post('/validateToken', app.authentication.auth.validateToken)
        
    // cad user
    app.route('/login/cadastroUser')
        .post(app.services.userService.save)
    // users
    // app.route('/user')
    //     .post(app.services.userService.save)
    app.route('/user/:id')
        .all(app.config.passport.authenticate())
        .put(app.services.userService.save)
        .get(app.services.userService.getById)

    app.route('/product')
        .post(app.services.productService.save)
        .get(app.services.productService.getProduct)

    app.route('/product/:id')
        .get(app.services.productService.getByIdProduct)
        .delete(app.services.productService.deleteProduct)
}