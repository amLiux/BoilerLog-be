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

    const userToUpdate = await Usuarios.find({_id: id}).lean()

    if(!userToUpdate.length > 0)
        return res.status(500).json({ok: false, msg: 'No se encontro el usuario, intenta mas tarde!'})

    const newUser = await Usuarios.findByIdAndUpdate(id, {estado: !userToUpdate[0].estado}, {new: true})

    res.status(200).json({ok: true, msg: 'El usuario se actualizo!', newUser})
        
}

module.exports = {
    getAllUsers,
    updateUserDetails
}