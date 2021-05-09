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

    userToUpdate.length > 0 
        ? 
            await Usuarios.findByIdAndUpdate(id, {estado: !userToUpdate[0].estado})
        :
            res.status(500).json({ok: false, msg: 'No se encontro el usuario, intenta mas tarde!'})
}

module.exports = {
    getAllUsers,
    updateUserDetails
}