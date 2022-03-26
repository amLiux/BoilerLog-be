const BoilerLogServer = require('./server');
require('./database/database');
require('dotenv').config();

const server = new BoilerLogServer();

server.listen();