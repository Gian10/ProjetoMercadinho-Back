
module.exports = app =>{

    // login
    app.route('/login')
        .post(app.authentication.auth.login)
        
    // cad user
    app.route('/login/cadastroUser')
        .post(app.services.userService.save)


    // users
    // app.route('/user')
    //     .post(app.services.userService.save)
       
    app.route('/user/:id')
        .put(app.services.userService.save)
        .get(app.services.userService.getById)
}