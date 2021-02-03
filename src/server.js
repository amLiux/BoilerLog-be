import express from 'express'
import exphbs from 'express-handlebars'
import morgan from 'morgan'
import path from 'path'
import methodOverride from 'method-override'
import session from 'express-session'
import passport from 'passport'
import flash from 'connect-flash'
import {allowInsecurePrototypeAccess} from '@handlebars/allow-prototype-access'
import Handlebars from 'handlebars'
import sass from 'node-sass-middleware'


import MainMap from './routes/mainMap.routes'

//Inicializaciones
const app = express()

//Seteando el path de los views al servidor
app.set('views', path.join(__dirname, 'views'))

//Configurando paths y extensiones para el TE .hbs
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'templates'),
    extname:'.hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
}))

//seteando el Template engine .hbs al  servidor
app.set('view engine', '.hbs')

// TODO comment
app.set('port', process.env.PORT || 3000)

/*Middlewares*/
//sirve para extraer datos de metodos POST
app.use(express.urlencoded({extended:false}))

//methodOverride permite que un form html pueda utilizar metodos put y delete ademas de post y get
app.use(methodOverride('tipo'))

//crea las famosas sesiones de node por medio del paquete express-session
app.use(session({
    secret: 'miSecretoSecretisimo',
    resave: true,
    saveUninitialized: false
}))

//TODO que es flash y como funciona
app.use(flash())

//TODO que son esos gm, bm, err1
app.use((req,res,next)=>{
    app.locals.gMessage = req.flash('gMessage')
    app.locals.bMessage = req.flash('bMessage')
    app.locals.eMessage = req.flash('err1')
    next()
})

//inicializa passport
app.use(passport.initialize())

//abre sesiones
app.use(passport.session())
require('./auth/local-auth')
require('./auth/google-auth')



//revisa y printea en consola los diferentes peticiones que ejecuta el server
app.use(morgan('dev'))

/*Fin Middlewares*/ 

//Rutas 
app.use(MainMap)

app.use(sass({
    /* Options */
    src: `${__dirname}/sass/`,
    dest: path.join(__dirname, 'public/'),
    debug: true,
    outputStyle: 'expanded',
}))

//Directorio de archivos css, js
app.use(express.static(path.join(__dirname, './public')))

export default app