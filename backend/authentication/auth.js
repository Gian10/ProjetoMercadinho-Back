const {authSecret} = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')

module.exports = app =>{

    const login = async (req, res) =>{

        const user = await app.db('users').select('id','nome', 'senha').where({nome: req.body.nome}).first()
        
        if(!user){
            return res.status(500).send('NOME INVÁLIDO')
        }
        const isEqual = bcrypt.compareSync(req.body.senha, user.senha)
        
        if(!isEqual){
            return res.status(401).send('SENHA INVÁLIDA')
        }
        
        const dateNowSeconds = Math.floor(Date.now() /  1000)
        
        // iat: emitido em   
        const playload = {
            id: user.id,
            name: user.nome,
            iat: dateNowSeconds,
            //exp: dateNowSeconds + (60 * 60 * 24 * 3)
            // 10 min * 60 segundos * mil milisecundos
            exp: dateNowSeconds + (10 * 60 * 1000)
        }

        res.json({ ...playload, token: jwt.encode(playload, authSecret)})
    }

    const validateToken = async (req, res) =>{
        const userData = req.body || null
        try{
            if(userData){
                const token = jwt.decode(userData.token, authSecret)
               console.log(token.exp)
                // zulu time
                if(new Date(token.exp * 1000) > new Date()){
                    // token valido
                    return res.send(true)
                    //return res.send(new Date(token.exp * 1000), new Date())
                }
            }

        }catch(erro){

        }
        res.send(false)
    }

    return {login, validateToken}
}