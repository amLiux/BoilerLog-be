const { Router } = require('express');
const { validators } = require('../constants/express-validators');
const { crearCitaPublica } = require('../controllers/index.controller');
const homeRouter = Router();

const { homeValidators } = validators;

homeRouter.post('/home', homeValidators['/home--POST'], crearCitaPublica);

homeRouter.get('/', (_, res) => res.redirect('/home'));

homeRouter.get('/auth/login/', (_, res) => res.redirect('/dentaltask'));

module.exports = homeRouter;