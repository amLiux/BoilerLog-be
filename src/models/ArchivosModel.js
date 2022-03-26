const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Archivo 
 * Nuestro modelo del objeto Archivo
 * @param {idPaciente} string id del paciente
 * @param {nombreArchivo} string nombre del archivo
 * @param {fechaCreado} string fecha en que se subio el archivo
 */

const Archivo = new Schema({
    idPaciente: {
        type: String,
        required: [true, 'El id del paciente es requerido']
    },
    nombreArchivo: {
        type: String,
        required: [true, 'El nombre del archivo es requerido']
    },
    fechaCreado: {
        type: Date,
        default: Date.now()
    },
});

//Exportando el modelo para que sea visible en otros lugares donde necesitemos instanciarlo
module.exports = mongoose.model('archivos', Archivo);