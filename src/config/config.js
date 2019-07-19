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
    urlDB = 'mongodb://localhost:27017/nodeuptask';
    
}else{
    urlDB = 'mongodb://chelito:admin1@ds127015.mlab.com:27015/nodeuptask';
}

process.env.uriDB = urlDB;

//====================================
//Google Client ID && Google Secret
//====================================
process.env.googleClient = process.env.googleClient || '506119842795-eetu718mi6j0aumkqr0mjpm5a9qhfq2g.apps.googleusercontent.com'; 
process.env.googleSecret = process.env.googleSecret || 'AS9_sloeyoUhbaJrpnhB0BsQ'; 