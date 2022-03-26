const { Router } = require('express');
const { validarJWT } = require('../middlewares/middlewares');
const {
    obtenerArchivos,
    subirArchivo,
    borrarArchivo,
    descargarArchivo
} = require('../controllers/files.controller');
const { validators } = require('../constants/express-validators');

const { filesValidators } = validators;

const filesRouter = Router();

// Endpoint para descargar un Archivo
filesRouter.get(
    '/files/:_id&:fileName',
    validarJWT,
    filesValidators['/files/_id&fileName--GET'],
    descargarArchivo
);

// Endpoint para obtener los archivos de un paciente 
filesRouter.get(
    '/files/:_id',
    validarJWT,
    filesValidators['/files/_id--GET'],
    obtenerArchivos
);

// Endpoint para guardar un Archivo
filesRouter.post(
    '/files/:_id', 
    validarJWT,
    filesValidators['/files/_id--POST'],
    subirArchivo
);

// Endpoint para eliminar un Archivo
filesRouter.delete(
    '/files/:_id&:fileName',
    validarJWT,
    filesValidators['/files/_id&fileName--DELETE'],
    borrarArchivo
);

module.exports = filesRouter;