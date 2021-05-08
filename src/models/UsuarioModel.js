const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require ('bcrypt')

const rolesValidos = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un rol valido'
}

const Usuario = new Schema({
    user:{
        type: String,
        index: {unique: true},
        required: [true, 'El usuario es necesario'],
    },
    nombre:{
        type: String,
        required: [true, 'El nombre es necesario'],
        maxlength: 15
    },
    apellido:{
        type: String,
        required: [true, 'El apellido es necesario'],
        maxlength: 15
    },
    pass:{
        type: String,
        required: [true, 'El password es necesario'],
    },
    email:{
        type: String,
        required: [true, 'El correo electrónico es necesario']
    },
    estado:{
        type: Boolean,
        default: true
    },
    rol:{
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
})

Usuario.methods.encriptarPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

Usuario.methods.compararPassword = function(password){
    return bcrypt.compareSync(password, this.pass)
} 

// Usuario.index();

module.exports = mongoose.model('usuarios', Usuario)