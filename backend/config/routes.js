
module.exports = app =>{
    // users
    app.route('/user')
        .post(app.services.userService.save)
       

    app.route('/user/:id')
        .put(app.services.userService.save)
        .get(app.services.userService.getById)
}