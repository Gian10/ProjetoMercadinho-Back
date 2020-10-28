const {authSecret} = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')
const { select, as } = require('../config/db')

module.exports = app =>{

    const login = async (req, res) =>{

        const user = await app.db('users').select('id','nome', 'senha').where({nome: req.body.nome}).first()
        
        const isEqual = bcrypt.compareSync(req.body.senha, user.senha)
        
        if(!isEqual){
            return res.status(401).send('Senha Inválida')
        }
        
        const dateNowSeconds = Math.floor(Date.now() /  1000)
        
        // iat: emitido em   
        const playload = {
            id: user.id,
            name: user.nome,
            iat: dateNowSeconds,
            exp: dateNowSeconds + (60 * 60 * 24 * 3)
        }

        res.json({ ...playload, token: jwt.encode(playload, authSecret)})
    }

    const validateToken = async (req, res) =>{
        const userData = req.body || null
        try{
            if(userData){
                const token = jwt.decode(userData.token, authSecret)

                if(new Date(token.exp * 1000) > new Date()){
                    // token valido
                    return res.send(true)
                }
            }

        }catch(erro){

        }
        res.send(false)
    }

    return {login, validateToken}
}