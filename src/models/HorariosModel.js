const mongoose = require('mongoose')

//recibe la clase Schema de la libreria mongoose
const Schema = mongoose.Schema

//nuestro modelo o clase del objeto Horario para guardar en base de datos
const Horario = new Schema({
    horario:{
        type: [Date, Date],
        required: [true, 'El horario es necesario'],
        unique:true
    },
})



//exportando el modelo para que sea visible en otros lugares donde necesitemos instanciarlo
module.exports = mongoose.model('horarios', Horario)