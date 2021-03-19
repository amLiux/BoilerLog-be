const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require ('bcrypt')

const rolesValidos = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un rol valido'
}

const User = new Schema({
    user:{
        type: String,
        index: {unique: true},
        required: [true, 'El usuario es necesario']
    },
    nombre:{
        type: String,
        index: {unique: true},
        required: [true, 'El nombre es necesario']
    },
    apellido:{
        type: String,
        index: {unique: true},
        required: [true, 'El apellido es necesario']
    },
    pass:{
        type: String,
        required: [true, 'El password es necesario']
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

User.methods.encriptarPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10))

User.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.pass;
    return userObject;
}

User.methods.compararPassword = function(password){
    return bcrypt.compareSync(password, this.pass)
} 

module.exports = mongoose.model('usuarios', User)