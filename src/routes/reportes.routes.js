const { Router } = require('express');
const { validators } = require('../constants/express-validators');
const { generarReportes } = require('../controllers/reportes.controller');
const { validarJWT } = require('../middlewares/middlewares');
const { reportesValidators } = validators;
const reportsRouter = Router();

//Endpoint de reportes, metodo HTTP POST
reportsRouter.post(
    '/reportes/:reporte',
    reportesValidators['/reportes/reporte--POST'],
    validarJWT,
    generarReportes
);

module.exports = reportsRouter;