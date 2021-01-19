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

export default {
    mongodbUrl: process.env.MONGODB_URI,
    tokenLife: process.env.TOKEN_LIFE,
    secret: process.env.API_SEED,
    googleClient: process.env.GOOGLE_CLIENT_ID,
    googleSecret: process.env.GOOGLE_SECRET
}

//====================================