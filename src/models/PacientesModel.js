const mongoose = require('mongoose')
const Schema = mongoose.Schema

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
})

Pacientes.index({ 'nombre': 'text', 'apellido': 'text', 'cedula': 'text', 'numeroTelefonico': 'text', 'email': 'text'})

module.exports = mongoose.model('pacientes', Pacientes)