const {authSecret} = require('../.env')
const passport = require('passport')
const passportJwt = require('passport-jwt')
const {Strategy, ExtractJwt} = passportJwt

module.exports = app =>{

    const params = {
        secretOrKey: authSecret,
        // extrair o bearer do cabeçalo da requisição
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    }

    //null paramentro de erro
    const strategy = new Strategy(params, (payload,done) =>{
        app.db('users').where({id: payload.id}).first()
        .then(user => done(null, user ? { ...payload} : false))
        .catch(err => done(err, false))
    })
    // utilizando minha estrategia
    passport.use(strategy)

    return {
        authenticate: () => passport.authenticate('jwt', {session: false})
    }
}