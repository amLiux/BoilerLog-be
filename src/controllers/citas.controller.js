const { response } = require('express');
const Citas = require('../models/CitasModel');
const { crearPeticionDeCitaYGuardar } = require('../controllers/index.controller');
const { construirRespuesta } = require('../helpers/construirRespuesta');
const { respuestasValidas } = require('../constants/HTTP');
const { checkHorariosDisponibles } = require('../helpers/citas');
const { obtenerLoggableBody } = require('../helpers/logger');

const obtenerCitas = async (req, res = response) => {
    let respuesta;

    try {
        const citas = await Citas.find({}).lean();
        respuesta = construirRespuesta(respuestasValidas.CITAS_ENCONTRADAS, res, { citas });
    } catch (err) {
        const loggablePayload = obtenerLoggableBody(req, err);
        respuesta = construirRespuesta(respuestasValidas.ERROR_INTERNO, res, loggablePayload);
    }
    return respuesta;
};

const cancelarCita = async (req, res = response) => {
    let respuesta;

    try {
        const id = req.params._id;

        const citaParaActualizar = await Citas.findOne({ '_id': id });

        if (!citaParaActualizar) {
            respuesta = construirRespuesta(respuestasValidas.CITA_DESCONOCIDA, res, {}, id);
            return respuesta;
        }

        const update = {
            estado: 'CANCELADA',
            fechaDeseada: new Date(citaParaActualizar.fechaDeseada.setHours(0))
        };

        const citaActualizada = await Citas.findOneAndUpdate({ '_id': id }, update, {
            new: true
        });

        respuesta = construirRespuesta(respuestasValidas.CITA_CANCELADA, res, citaActualizada);

    } catch (err) {
        const loggablePayload = obtenerLoggableBody(req, err);
        respuesta = construirRespuesta(respuestasValidas.ERROR_INTERNO, res, loggablePayload);
    }

    return respuesta;
};

const crearCita = async (req, res = response) => {
    let respuesta;

    try {
        const { nombre, apellido, email, numeroTelefonico, _id: id } = req.body.paciente;
        const { horario } = req.body;

        const newCita = await crearPeticionDeCitaYGuardar(nombre, apellido, email, numeroTelefonico, horario, id);

        if (newCita._id) {
            // const envioCorreo = await notificarPeticiónCitaAgendada(email, nombre, apellido, teléfono, dateCorreo, _id)
            respuesta = construirRespuesta(respuestasValidas.CITA_CREADA, res, newCita);
        }

    } catch (err) {
        const loggablePayload = obtenerLoggableBody(req, err);
        respuesta = construirRespuesta(respuestasValidas.ERROR_INTERNO, res, loggablePayload);
        return respuesta;
    }

    return respuesta;
};

const actualizarCita = async (req, res = response) => {

    try {
        const citaParaActualizar = req.body;

        const nuevaCita = await Citas.findOneAndUpdate({ '_id': citaParaActualizar._id }, citaParaActualizar, { new: true }).lean();

        if (nuevaCita) {
            const respuesta = construirRespuesta(respuestasValidas.CITA_ACTUALIZADA, res, nuevaCita);
            return respuesta;
        }

    } catch (err) {
        const loggablePayload = obtenerLoggableBody(req, err);
        return construirRespuesta(respuestasValidas.ERROR_INTERNO, res, loggablePayload);
    }
};

const getOpcionesCita = async (req, res = response) => {
    let respuesta;

    try {
        const id = req.params._id;
        const [cita] = await Citas.find({ '_id': id }).lean();

        if (cita.estado === 'AGENDADA') return res.redirect(301, 'http://localhost:3000/home.html');

        if (cita._id) {
            const diaSiguiente = new Date(cita.fechaDeseada);
            diaSiguiente.setDate(cita.fechaDeseada.getDate() + 1);

            const citasMismoDia = await Citas.find({
                fechaDeseada: {
                    $gte: cita.fechaDeseada,
                    $lt: diaSiguiente.toISOString()
                }
            });

            const horariosDisponibles = checkHorariosDisponibles(citasMismoDia);

            respuesta = construirRespuesta(
                respuestasValidas.CITAS_PUBLICAS_ENCONTRADAS,
                res,
                {
                    horariosDisponibles,
                    nombre: cita.nombre,
                    fecha: new Date(cita.fechaDeseada).toLocaleDateString()
                }
            );
        }
    }
    catch (err) {
        const loggablePayload = obtenerLoggableBody(req, err);
        respuesta = construirRespuesta(respuestasValidas.ERROR_INTERNO, res, loggablePayload);
    }

    return respuesta;

};

const obtenerCitasDePaciente = async (req, res = response) => {
    try {
        const id = req.params._id;
        const citas = await Citas.find({ 'idPaciente': id }).lean();
        return construirRespuesta(respuestasValidas.CITAS_PACIENTE_ENCONTRADAS, res, { citas: [...citas] });
    } catch (err) {
        const loggablePayload = obtenerLoggableBody(req, err);
        return construirRespuesta(respuestasValidas.ERROR_INTERNO, res, loggablePayload);
    }

};


//TODO esto parece logica repetida de getOpcionesCita BL-12-citasEndpointFix
const getOpcionesCitaByDate = async (req, res = response) => {
    let respuesta;
    try {
        const date = req.params.date;
        const queryDate = new Date(date);
        const diaSiguiente = new Date(queryDate);
        diaSiguiente.setDate(queryDate.getDate() + 1);

        const citasMismoDia = await Citas.find({ fechaDeseada: { $gte: queryDate, $lt: diaSiguiente } });

        const horariosDisponibles = checkHorariosDisponibles(citasMismoDia, true);
        respuesta = construirRespuesta(respuestasValidas.CITAS_FECHA_ENCONTRADAS, res, { horariosDisponibles });
    } catch (err) {
        const loggablePayload = obtenerLoggableBody(req, err);
        respuesta = construirRespuesta(respuestasValidas.ERROR_INTERNO, res, loggablePayload);
    }

    return respuesta;

};

const actualizarHorario = async (req, res) => {
    let respuesta;
    try {
        const id = req.params._id
        const { horario } = req.body

        const [cita] = await Citas.find({ '_id': id }).lean()

        if (cita._id) {
            const updatedFecha = {
                fechaDeseada: new Date(cita.fechaDeseada.setHours(horario)),
                estado: 'AGENDADA'
            }

            await Citas.findOneAndUpdate({ _id: id }, updatedFecha);

            respuesta = construirRespuesta(respuestasValidas.CITA_PUBLICA_AGENDADA, res);
        }
    } catch (err) {
        const loggablePayload = obtenerLoggableBody(req, err);
        respuesta = construirRespuesta(respuestasValidas.ERROR_INTERNO, res, loggablePayload);
    }
    return respuesta;
};

module.exports = {
    actualizarCita,
    obtenerCitas,
    getOpcionesCita,
    actualizarHorario,
    getOpcionesCitaByDate,
    crearCita,
    cancelarCita,
    obtenerCitasDePaciente
}