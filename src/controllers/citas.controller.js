const { response } = require('express')
const Citas = require('../models/CitasModel')
const { crearPeticionDeCitaYGuardar } = require('../controllers/index.controller')
const { construirRespuesta } = require('../helpers/construirRespuesta')
const { respuestasValidas } = require('../constants/HTTP')

const obtenerCitas = async (_, res = response) => {
    const citas = await Citas.find({}).lean();
    return construirRespuesta(respuestasValidas.CITAS_ENCONTRADAS, res, { citas });
}

const cancelarCita = async (req, res = response) => {
    let respuesta;

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

    try {
        const citaActualizada = await Citas.findOneAndUpdate({ '_id': id }, update, {
            new: true
        });

        respuesta = construirRespuesta(respuestasValidas.CITA_CANCELADA, res, citaActualizada);

    } catch (err) {
        respuesta = construirRespuesta(respuestasValidas.ERROR_INTERNO, res);
    }

    return respuesta;
}

const crearCita = async (req, res = response) => {
    const { nombre, apellido, email, numeroTelefonico, _id: id } = req.body.paciente
    const { horario } = req.body

    let respuesta;

    try {
        const newCita = await crearPeticionDeCitaYGuardar(nombre, apellido, email, numeroTelefonico, horario, id);

        if (newCita._id) {
            // const envioCorreo = await notificarPeticiónCitaAgendada(email, nombre, apellido, teléfono, dateCorreo, _id)
            respuesta = construirRespuesta(respuestasValidas.CITA_CREADA, res, newCita);
        }

    } catch (err) {
        respuesta = construirRespuesta(respuestasValidas.ERROR_INTERNO, res);
    }

    return respuesta;
}

const actualizarCita = async (req, res = response) => {
    const citaParaActualizar = req.body;

    try {
        const nuevaCita = await Citas.findOneAndUpdate({ '_id': citaParaActualizar._id }, citaParaActualizar, { new: true }).lean();

        if (nuevaCita) {
            const respuesta = construirRespuesta(respuestasValidas.CITA_ACTUALIZADA, res, nuevaCita);
            return respuesta;
        }

    } catch (err) {
        return construirRespuesta(respuestasValidas.ERROR_INTERNO, res);
    }
}

const getOpcionesCita = async (req, res = response) => {
    const id = req.params._id
    const [cita] = await Citas.find({ '_id': id }).lean()


    if (cita.estado === 'AGENDADA')
        return res.redirect(301, 'http://localhost:3000/home.html')

    if (cita._id) {
        const diaSiguiente = new Date(cita.fechaDeseada)
        diaSiguiente.setDate(cita.fechaDeseada.getDate() + 1)
        const citasMismoDia = await Citas.find({ fechaDeseada: { $gte: cita.fechaDeseada, $lt: diaSiguiente.toISOString() } })
        const horariosDisponibles = checkHorariosDisponibles(citasMismoDia)

        res.status(200).json({
            ok: true,
            horariosDisponibles,
            nombre: cita.nombre,
            fecha: new Date(cita.fechaDeseada).toLocaleDateString()
        })
    }
}

const obtenerCitasDePaciente = async (req, res = response) => {
    const id = req.params._id;
    const citas = await Citas.find({ 'idPaciente': id }).lean();
    return construirRespuesta(respuestasValidas.CITAS_PACIENTE_ENCONTRADAS, res, { citas: [...citas] });
}

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
        respuesta = construirRespuesta(respuestasValidas.ERROR_INTERNO, res);
    }

    return respuesta;

}

const checkHorariosDisponibles = (citas, todos = false) => {
    const todosHorarios = todos ? 11 : 3
    let horariosTomados = []
    citas.map(cita => horariosTomados.push(cita.fechaDeseada.getHours()))
    const citasAgendadas = horariosTomados.filter(horario => horario !== 0)
    if (citasAgendadas.length === 0)
        return [...generadorDeRangos(7, 17).sort(() => Math.random() - Math.random()).slice(0, todosHorarios)]
    else
        return [...generadorDeRangos(7, 17)].filter(horario => !citasAgendadas.includes(horario)).sort(() => Math.random() - Math.random()).slice(0, todosHorarios)

}

const generadorDeRangos = (start, end, length = end - start + 1) =>
    Array.from({ length }, (_, i) => start + i)

const actualizarHorario = async (req, res) => {
    const id = req.params._id
    const { horario } = req.body

    const [cita] = await Citas.find({ '_id': id }).lean()

    if (cita._id) {
        const updatedFecha = {
            fechaDeseada: new Date(cita.fechaDeseada.setHours(horario)),
            estado: 'AGENDADA'
        }

        await Citas.findOneAndUpdate({ _id: id }, updatedFecha);

        res.status(200).json({
            ok: true,
            msg: 'La cita ha sido agendada, gracias!'
        })
    }
}

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