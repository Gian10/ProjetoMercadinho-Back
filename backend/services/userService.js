const bcrypt = require('bcrypt')

module.exports = app =>{
    const encryptPassword = passward =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(passward, salt)
    }

    const save = (req, res) =>{
        const use = { ...req.body}

        res.status(200).send(use)
    }

    return {save}
}