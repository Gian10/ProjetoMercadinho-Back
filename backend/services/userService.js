const bcrypt = require('bcrypt')

module.exports = app =>{
    const encryptPassword = passward =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(passward, salt)
    }

    const save = (req, res) =>{
        const use = { ...req.body}

        if(req.params.id){
            use.id = req.params.id
        }

        use.senha = encryptPassword(req.body.senha)

        if(use.id){
            
        }else{

        }
        
    }

    return {save}
}