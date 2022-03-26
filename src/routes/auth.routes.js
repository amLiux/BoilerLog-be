const express = require('express');
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth.controller');
const { validarJWT } = require('../middlewares/middlewares');
const { validators } = require('../constants/express-validators');

const { authValidators } = validators;
const authRouter = express.Router();

// Endpoint de registro
authRouter.post('/new', authValidators['/new'], crearUsuario);

// Endpoint de autenticación
authRouter.post('/login', authValidators['/login'], loginUsuario);

// Endpoint de validación
authRouter.get('/renew', validarJWT, revalidarToken);

module.exports = authRouter;