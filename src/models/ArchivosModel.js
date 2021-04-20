const mongoose = require('mongoose')

//recibe el objeto model y la clase Schema de la libreria mongoose
const Schema = mongoose.Schema

//nuestro modelo o clase del objeto cita para guardar en base de datos
const Archivo = new Schema({
    idPaciente:{
        type: String,
        required: [true, 'El id del paciente es requerido']
    },
    nombreArchivo:{
        type: String,
        required: [true, 'El nombre del archivo es requerido']
    },
    fechaCreado: {
        type: Date, 
        default: Date.now() 
    },
})

//exportando el modelo para que sea visible en otros lugares donde necesitemos instanciarlo
module.exports = mongoose.model('archivos', Archivo)