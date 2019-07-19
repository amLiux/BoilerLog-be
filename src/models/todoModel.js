const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const todoSchema = new Schema({
    nombre_tarea: {type: String, required: true},
    estado_tarea: {type: Number, default: 0},
    descripcion_tarea: {type: String, required: true},
    fecha_creada: {type: Date, default: Date.now() },
    fecha_limite: {type: Date, required: true},
    id_proyect: {type: String, required:false}
});

module.exports = mongoose.model('colleciontodo', todoSchema);