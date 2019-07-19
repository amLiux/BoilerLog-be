const mongoose = require('mongoose');

let Schema = mongoose.Schema;

const proyectSchema = new Schema({
    nombre_proyect: {type: String, required: true},
    id_user: {type: String, required:false}
});

module.exports = mongoose.model('collecionProyectos', proyectSchema);
