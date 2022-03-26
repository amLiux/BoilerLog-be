const mongoose = require ('mongoose');

async function dbConnection() {
    try {
        const db = await mongoose.connect(
            process.env.MONGODB_URI, 
            {
                useNewUrlParser: true,
                useUnifiedTopology:true,
                useCreateIndex: true,
                useFindAndModify: false
            }
        );
        console.log(`BoilerLog esta conectado a la base de datos ${db.connection.name}`);

    } catch(error) {
        console.error(`Hubo un error conectando con la base de datos: ${error}`);
    }
};

module.exports = {
    dbConnection
};