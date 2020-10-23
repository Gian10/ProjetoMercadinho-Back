
module.exports = app =>{
    // users
    app.route('/user')
        .post(app.services.userService.save)
}