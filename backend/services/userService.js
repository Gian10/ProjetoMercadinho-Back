const bcrypt = require('bcrypt')

module.exports = app =>{
    const encryptPassword = passward =>{
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(passward, salt)
    }

    const saveUser = (req, res) =>{
        const user = { ...req.body}

        if(req.params.id){
            user.id = req.params.id
        }

        user.senha = encryptPassword(req.body.senha)

        if(user.id){
           app.db('users').update(user).where({id: user.id})
            .then(_ => res.status(201).send())
            .catch(erro => res.status(500).send('ERRO AO ATUALIZAR DADOS DE USUÁRIO'))

        }else{
            app.db('users').insert(user)
            .then(_ => res.status(201).send())
            .catch(erro => res.status(500).send('ERRO AO SALVAR USUÁRIO'))
        }
        
    }

    const getUsers = (req, res) =>{
        app.db('users').select('id', 'nome', 'senha').orderBy('id')
        .then(users => res.status(200).send(users))
        .catch(erro => res.status(500).send('ERRO AO BUSCAR USUÁRIO'))

    }

    const getByIdUser = (req, res) =>{
        app.db('users').select('id', 'nome', 'senha').where({id: req.params.id})
        .then(user => res.status(200).send(user))
        .catch(erro => res.status(500).send('ERRO AO BUSCAR USUÁRIO'))
    }  

    return {saveUser, getByIdUser, getUsers}
}