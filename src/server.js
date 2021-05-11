const express = require ('express')
const morgan = require('morgan')
const path = require('path')
const methodOverride = require ('method-override')
const sass = require ('node-sass-middleware')
const cors = require ('cors')
const fileUpload = require('express-fileupload')

require('dotenv').config()
require('./cronjobs/citas.cron')


//Inicializaciones
const app = express()

const MainMap = require ('./routes/mainMap.routes')

app.use(cors())

// Settea el port basado en lo que tengamos en nuestro archivo .env
app.set('port', process.env.PORT || 3000)

//methodOverride permite que un form html pueda utilizar metodos put y delete ademas de post y get
app.use(methodOverride())

//revisa y printea en consola los diferentes peticiones que ejecuta el server
app.use(morgan('dev'))

app.use(fileUpload({
    limits: { fileSize: 50 * 1024 * 1024 },
    abortOnLimit: true,
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));

/*Fin Middlewares*/ 

//Rutas 
app.use(MainMap)

app.use(sass({
    src: `${__dirname}/sass/`,
    dest: path.join(__dirname, 'public/'),
    debug: true,
    outputStyle: 'expanded',
}))

//Directorio de archivos css, js
app.use('/', express.static(path.join(__dirname, './public'), {
    extensions: ['html']
}))

if(true){
    app.use(express.static(path.join(__dirname, './client/build')))
    app.get('/dentaltask', (req, res) => res.sendFile(path.join(__dirname, './client', 'build', 'index.html')))
}

module.exports = app

