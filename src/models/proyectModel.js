import {model, Schema} from 'mongoose'

const proyectSchema = new Schema({
    nombre_proyect: {type: String, required: true},
    id_user: {type: String, required:false}
});

export default model('collecionProyectos', proyectSchema);
