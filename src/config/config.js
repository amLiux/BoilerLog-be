import {config} from 'dotenv'
config()

//====================================
//Configuración del puerto
//====================================
process.env.PORT = process.env.PORT || 3000;
//====================================
//Configuración del Entorno
//====================================
process.env.NODE_ENV = process.env.NODE_ENV || 'dev';
//====================================
//Configuración database
//====================================
let urlDB;
if(process.env.NODE_ENV === 'dev'){
    urlDB = 'mongodb://10.42.0.153:27017/nodeuptask';
    
}else{
    // TODO check how to do this
    urlDB = 'mongodb://chelito:admin1@ds127015.mlab.com:27015/nodeuptask';
}

export default {
    mongodbUrl: process.env.MONGODB_URI,
    tokenLife: process.env.TOKEN_LIFE,
    secret: process.env.API_SEED
}

//====================================