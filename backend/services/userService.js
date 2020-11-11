const bcrypt = require('bcrypt')

module.exports = app =>{
    const encryptPassword = passward =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(passward, salt)
    }

    const save = (req, res) =>{
        const user = { ...req.body}

        if(req.params.id){
            user.id = req.params.id
        }

        user.senha = encryptPassword(req.body.senha)

        if(user.id){
           app.db('users').update(user).where({id: user.id})
            .then(_ => res.status(201).send())
            .catch(erro => res.status(500).send('erro ao atualizar'))

        }else{
            app.db('users').insert(user)
            .then(_ => res.status(201).send())
            .catch(erro => res.status(500).send('erro ao salvar'))
        }
        
    }

    const getUsers = (req, res) =>{
        app.db('users').select('id', 'nome', 'senha').orderBy('id')
        .then(users => res.status(200).send(users))
        .catch(erro => res.status(500).send('erro ao buscar usuarios'))

    }

    const getById = (req, res) =>{
        app.db('users').select('id', 'nome', 'senha').where({id: req.params.id})
        .then(user => res.status(200).send(user))
        .catch(erro => res.status(500).send("Erro ao pesquisar usuário"))
    }  

    return {save, getById, getUsers}
}