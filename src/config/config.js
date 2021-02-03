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
    environment: process.env.NODE_ENV,
    projectPort: process.env.PORT,
    mongodbUrl: process.env.MONGODB_URI,
    tokenLife: process.env.TOKEN_LIFE,
    secret: process.env.API_SEED,
    googleAccount: process.env.GMAIL_ACCOUNT,
    googlePwd: process.env.GMAIL_PWD,
    googleClient: process.env.GOOGLE_CLIENT_ID,
    googleSecret: process.env.GOOGLE_SECRET
}

//====================================