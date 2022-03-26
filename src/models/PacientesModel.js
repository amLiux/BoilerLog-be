const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Paciente 
 * Nuestro modelo del objeto Paciente
 * @param {email} string email del paciente
 * @param {numeroTelefonico} string max de 9 por la cantidad de numeros en los numeros telefonicos costarricences
 * @param {nombre} string nombre del paciente
 * @param {apellido} string apellido del paciente
 * @param {fechaCreado} string fecha en que se creo el paciente
 * @param {cedula} string cedula del paciente 
 */

const Pacientes = new Schema({
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
    cedula:{
        type: String,
        required: [true, 'La cédula es necesaria'],
        maxlength: 15,
        unique:true
    },
    numeroTelefonico:{
        type: String,
        required: [true, 'El número telefónico es necesario'],
        maxlength: 15
    },
    email:{
        type: String,
        required: [true, 'El número telefónico es necesario'],
        maxlength: 40,
        unique:true
    },
    fechaCreado: {
        type: Date, 
        default: Date.now() 
    },
});

Pacientes.index({ 
    'nombre': 'text', 
    'apellido': 'text', 
    'cedula': 'text', 
    'numeroTelefonico': 'text', 
    'email': 'text'
});

module.exports = mongoose.model('pacientes', Pacientes);