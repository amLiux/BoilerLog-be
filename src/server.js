const express = require('express');
const path = require('path');
const methodOverride = require('method-override');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const MainMap = require('./routes/mainMap.routes');
const { dbConnection } = require('./database/database');
const { etiquetarPeticion } = require('./middlewares/middlewares');
const { httpLogger } = require('./helpers/logger');

require('dotenv').config();

class BoilerLogServer {
    constructor() {
        this.app = express();
        this.port =  process.env.PORT || 3000;

        this.middlewares();
        this.routes();
        this.database();
        this.serve();
    }

    middlewares() {
        this.app.use(etiquetarPeticion);
        this.app.use(httpLogger);

        this.app.use(cors());
        this.app.use(methodOverride());

        this.app.use(fileUpload({
            limits: { fileSize: 50 * 1024 * 1024 },
            abortOnLimit: true,
            useTempFiles: true,
            tempFileDir: '/tmp/'
        }));
    }

    routes() {
        this.app.use(MainMap);
    }

    listen() {
        this.app.listen(this.port, ()=> console.log(`Escuchando peticiones en http://localhost:${this.port}`));
    }

    async database() {
        await dbConnection();
    }

    serve() {
        this.app.use(
            '/', 
            express.static(path.join(__dirname, './public'), 
                {
                    extensions: ['html']
                }   
            )
        );

        this.app.use(express.static(path.join(__dirname, './client/build')));
    }
}

module.exports = BoilerLogServer;
