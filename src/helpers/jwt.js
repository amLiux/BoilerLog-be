const jwt =  require ('jsonwebtoken')
require('dotenv').config()

const generarJWT = (uid, name, rol) => 
    new Promise ((resolve, reject) => {
        const payload = {uid, name, rol};
        jwt.sign(payload, process.env.API_SEED, {
            expiresIn: process.env.TOKEN_LIFE
        }, (err, token) =>{
            err && reject('No se pudo generar el token')
            resolve(token)
        })
    })

module.exports = generarJWT