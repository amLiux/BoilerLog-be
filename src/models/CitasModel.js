const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const estadosValidos = {
    values: ['PENDIENTE', 'AGENDADA', 'CANCELADA', 'COMPLETADA'],
    message: '{VALUE} no es un rol valido'
};

/**
 * Cita
 * Nuestro modelo del objeto Cita
 * @param {estado} string oneOf [estadosValidos]
 * @param {email} string en caso de cita publica
 * @param {numeroTelefonico} string max de 9 por la cantidad de numeros en los numeros telefonicos costarricences
 * @param {nombre} string en caso de cita publica
 * @param {apellido} string en caso de cita publica
 * @param {fechaDeseada} Date fecha agendada por el cliente
 * @param {idPaciente} string id del Paciente 
 * @param {fechaCreada} string fecha en que se creo la cita
 * @param {nota} string nota de la cita
 */

const Cita = new Schema({
    estado: {
        type: String,
        default: 'PENDIENTE',
        enum: estadosValidos
    },
    email: {
        type: String,
        default: false,
        required: [true, 'El email es requerido']
    },
    numeroTelefonico: {
        type: String,
        default: false,
        required: [true, 'El numero telefonico es requerido'],
        maxlength: 9
    },
    nombre: {
        type: String,
        default: false,
        required: [true, 'El nombre es requerido'],
        maxlength: 15
    },
    apellido: {
        type: String,
        default: false,
        required: [true, 'El apellido es requerido'],
        maxlength: 15
    },
    fechaDeseada: {
        type: Date,
        default: Date.now(),
        required: [true, 'La fecha es requerida']
    },
    fechaCreada: {
        type: Date,
        default: Date.now()
    },
    idPaciente: {
        type: String,
        required: false
    },
    nota: {
        Type: String,
        required: false
    }
});

//exportando el modelo para que sea visible en otros lugares donde necesitemos instanciarlo
module.exports = mongoose.model('citas', Cita);