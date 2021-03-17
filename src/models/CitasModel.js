const mongoose = require('mongoose')

//recibe el objeto model y la clase Schema de la libreria mongoose
const Schema = mongoose.Schema

//recibe los estados validos de nuestro archivo de constantes
const estadosValidos = require ('../constants/constants')


//nuestro modelo o clase del objeto cita para guardar en base de datos
const Cita = new Schema({
    estado:{
        type: String,
        default: 'PENDIENTE_CONFIRMACION',
        enum: estadosValidos
    },
    email:{
        type: String,
        default: false,
        required: [true, 'El email es requerido']
    },
    numeroTelefonico:{
        type: String,
        default:false,
        required:[true, 'El numero telefonico es requerido']
    },
    nombre:{
        type:String,
        default:false,
        required: [true, 'El nombre es requerido']
    },
    apellido:{
        type:String,
        default:false,
        required: [true, 'El apellido es requerido']
    },
    fechaDeseada:{
        type: Date,
        default: Date.now(), 
        required: [true, 'La fecha es requerida']
    },
    fechaCreada: {
        type: Date, 
        default: Date.now() 
    },

})


//métodos de Cita
Cita.methods.cambiarEstado = (estado) => {
    //TODO change estado de cita
    // Cita.find
}

//exportando el modelo para que sea visible en otros lugares donde necesitemos instanciarlo
module.exports = mongoose.model('citas', Cita)