const mongoose = require('mongoose');
require('../config/config');

//conexion a la base de datos
mongoose.connect(process.env.uriDB,{
        useNewUrlParser: true,
        useCreateIndex: true,
    }
)
    .then(db=>console.log(`DB is UP`))
    .catch(e=>console.log(`There was an error: ${e}`));
