const { Router } = require('express');
const { validarJWT } = require('../middlewares/middlewares');
const {
    crearPaciente,
    obtenerPacientes,
    actualizarPaciente,
    busquedaPacientes
} = require('../controllers/pacientes.controller');
const { validators } = require('../constants/express-validators');
const pacientesRouter = Router();

const { pacientesValidators } = validators;

pacientesRouter.get('/pacientes', validarJWT, obtenerPacientes);

pacientesRouter.post(
    '/pacientes',
    pacientesValidators['/pacientes--POST'],
    validarJWT,
    crearPaciente
);

pacientesRouter.get(
    '/pacientes/search/:search',
    pacientesValidators['/pacientes/search--GET'],
    validarJWT, 
    busquedaPacientes
);

pacientesRouter.put(
    '/pacientes',
    pacientesValidators['/pacientes--PUT'],
    validarJWT,
    actualizarPaciente
);

module.exports = pacientesRouter;