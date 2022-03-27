const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require ('bcrypt');

const rolesValidos = {
    values: ['USER_ROLE', 'ADMIN_ROLE'],
    message: '{VALUE} no es un rol valido'
};

/**
 * Usuario 
 * Nuestro modelo del objeto Paciente
 * @param {user} string usuario
 * @param {pass} string contraseña
 * @param {rol} string oneOf [rolesValidos]
 * @param {nombre} string nombre del paciente
 * @param {apellido} string apellido del paciente
 * @param {email} string email del usuario
 * @param {estado} boolean estado del usuario
 * @method encriptarPassword encripta la contraseña antes de guardarla
 * @method compararPassword compara dos contraseñas
 */

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
});

Usuario.methods.encriptarPassword = (password) => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

Usuario.methods.compararPassword = function (password){
    return bcrypt.compareSync(password, this.pass)
}; 

Usuario.index({
    'user': 'text',
    'email': 'text',
});

module.exports = mongoose.model('usuarios', Usuario);