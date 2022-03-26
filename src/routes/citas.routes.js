const { Router } = require('express');
const { validarJWT } = require('../middlewares/middlewares');
const {
    crearCita,
    obtenerCitas,
    actualizarCita,
    getOpcionesCita,
    actualizarHorario,
    getOpcionesCitaByDate,
    cancelarCita,
    obtenerCitasDePaciente
} = require('../controllers/citas.controller');
const { validators } = require('../constants/express-validators');

const { citasValidators } = validators;
const citasRouter = Router();

// Endpoint para obtener todas las citas
citasRouter.get('/citas', validarJWT, obtenerCitas);

// Endpoint para crear una cita
citasRouter.post('/citas', citasValidators['/citas--POST'], validarJWT, crearCita);

// Endpoint para actualizar una cita sin agendar
citasRouter.put('/citas', citasValidators['/citas--PUT'], validarJWT, actualizarCita);

// Endpoint para cancelar una cita
citasRouter.delete('/citas/:_id', citasValidators['/citas--DELETE'], validarJWT, cancelarCita);

// Endpoint para obtener las opciones en una fecha especifica para una cita publica
citasRouter.get('/citas/:_id', citasValidators['/citas/_id--GET'], getOpcionesCita);

// Endpoint para obtener las citas de un paciente especifico
citasRouter.get(
    '/citas/paciente/:_id',
    citasValidators['/citas/pacientes--GET'],
    validarJWT,
    obtenerCitasDePaciente
);

// Endpoint para obtener las opciones de citas en una fecha especifica
// TODO parece repetido a la logica en getOpcionesCita BL-12-citasEndpointFix
citasRouter.get(
    '/citas/date/:date',
    citasValidators['/citas/date--GET'],
    validarJWT,
    getOpcionesCitaByDate
);

//Endpoint para actualizar el horario de una cita
citasRouter.post('/citas/:_id', citasValidators['/citas/_id--PUT'], actualizarHorario);

module.exports = citasRouter;