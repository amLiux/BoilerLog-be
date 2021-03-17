const { response } = require ('express')
const User = require('../models/UserModel')
const generarJWT = require('../helpers/jwt')

const crearUsuario = async(req, res = response ) => {
    
    const {user, name, lastName, email, pwd} = req.body

    try{

        const nuevoUsuario = new User({
            user,
            nombre: name,
            email,
            apellido: lastName
        })

        nuevoUsuario.pass = nuevoUsuario.encriptarPassword(pwd)

        await nuevoUsuario.save()

        const token = await generarJWT(nuevoUsuario.id, nuevoUsuario.user, nuevoUsuario.rol) 

        res.status(201).json({
            ok: true,
            uid: nuevoUsuario.id,
            name: nuevoUsuario.user,
            token
        })


    }catch(err){
        err.code === 11000 &&         
            res.status(409).json({
                ok: false,
                msg: 'Este usuario ya existe en nuestra base de datos!'
            })
        //todo handle other type of error not just duplicated
        console.log(err)
    }

}

const loginUsuario = async (req, res = response) => {
    
    const {user, pwd} = req.body

    console.log(user, pwd)

    try{
        
        const usuario = await User.findOne({user})

        console.log(usuario)

        if(!usuario)
            return res.status(404).json({
                ok: false,
                msg: `No se encontró el usuario ${name}`
            })

        if(!usuario.compararPassword(pwd))
            return res.status(403).json({
                ok: false,
                msg: `Contraseña incorrecta!`
            })


        const token = await generarJWT(usuario._id, usuario.user, usuario.rol) 

        res.status(200).json({
            ok: true,
            uid: usuario._id,
            name: usuario.user,
            token
        })

    }catch(err){
        return res.status(500).json({
            ok: false,
            msg: 'Error interno de servidor!'
        })
    }
}

const revalidarToken = async(req, res = response ) => {
    const {uid, name, rol} = req

    const token = await generarJWT(uid, name, rol) 
    res.status(200).json({
        ok: true,
        uid,
        name,
        token
    })
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}