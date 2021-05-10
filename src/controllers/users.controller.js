const { response } = require ('express');
const Usuarios = require('../models/UsuarioModel')

const getAllUsers = async (req, res=response) => {
    const allUsers = await Usuarios.find({}).lean()

    allUsers.length > 0 
        ? 
            res.status(200).json({ok: true, users: allUsers})
        :
            res.status(500).json({ok: false, msg: 'No se encontraron usuarios, intenta mas tarde!'})
}

const updateUserDetails = async (req, res=response) => {
    const id = req.params._id
    const update = req.body

    const userToUpdate = await Usuarios.findById(id)

    if(!userToUpdate)
        return res.status(500).json({ok: false, msg: 'No se encontro el usuario, intenta mas tarde!'})

    if(Object.keys(update).length === 0){
        const newUser = await Usuarios.findByIdAndUpdate(id, {estado: !userToUpdate.estado}, {new: true})
        return res.status(200).json({ok: true, msg: 'El usuario se actualizo!', newUser})
    }

    if(update.hasOwnProperty('pwd')){
        let {pwd} = update,
        user = new Usuarios()
        pwd = user.encriptarPassword(update.pwd)

        userToUpdate.pass = pwd

        const finish = await userToUpdate.save()

        if(finish){
            return res.status(200).json({ok: true, msg: 'Contraseña actualizada!'})
        }
    }



        
}

module.exports = {
    getAllUsers,
    updateUserDetails
}