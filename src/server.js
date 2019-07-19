require('./config/config');
const express = require('express');
const exphbs = require('express-handlebars');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');

//Inicializaciones
const app = express();
require('./database/database');
require('./auth/local-auth');



//Seteando el path de los views al servidor
app.set('views', path.join(__dirname, 'views'));
//Configurando paths y extensiones para el TE .hbs
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'templates'),
    extname:'.hbs',
}));
//seteando el TE .hbs al  servidor
app.set('view engine', '.hbs');


/*Middlewares*/
//sirve para extraer datos de metodos POST
app.use(express.urlencoded({extended:false}));
//methodOverride permite que un form html pueda utilizar metodos put y delete ademas de post y get
app.use(methodOverride('tipo'));
//crea las famosas sesiones de node por medio del paquete express-session
app.use(session({
    secret: 'miSecretoSecretisimo',
    resave: true,
    saveUninitialized: false
}));



//inicializa passport
app.use(passport.initialize());

//abre sesiones
app.use(passport.session());

//inicializa flash
app.use(flash());

app.use((req,res,next)=>{
    app.locals.gMessage = req.flash('gMessage');
    app.locals.bMessage = req.flash('bMessage');
    app.locals.eMessage = req.flash('err1');
    next();
});

//revisa y printea en consola los diferentes peticiones que ejecuta el server
app.use(morgan('dev'));

/*Fin Middlewares*/ 

//Rutas 
app.use(require('./routes/users'));
app.use(require('./routes/index'));
app.use(require('./routes/proyect'));
app.use(require('./routes/todo'));

//Directorio de archivos css, js
app.use(express.static(path.join(__dirname, './public')));





//Prendemos el servidor en un puerto dependiendo el enviroment
app.listen(process.env.PORT, ()=> {
    console.log(`Escuchando peticiones en puerto ${process.env.PORT}`);
});