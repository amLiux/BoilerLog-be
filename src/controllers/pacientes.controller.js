const { response } = require('express');
const Paciente = require('../models/PacientesModel');
const Citas = require('../models/CitasModel');
const { construirRespuesta } = require('../helpers/construirRespuesta');
const { respuestasValidas } = require('../constants/HTTP');

const crearPaciente = async (req, res = response) => {
    let respuesta;
    const { nombre, apellido, cedula, email, numeroTelefonico } = req.body;

    try {
        const nuevoPaciente = new Paciente({
            nombre,
            apellido,
            cedula,
            email,
            numeroTelefonico
        });

        const createdUser = await nuevoPaciente.save();

        await Citas.updateMany({ email }, {
            'idPaciente': createdUser.idPaciente,
            'email': email,
            'numeroTelefonico': numeroTelefonico,
            'nombre': nombre,
            'apellido': apellido
        });

        respuesta = construirRespuesta(respuestasValidas.PACIENTE_CREADO, res, createdUser, `${nombre} ${apellido}`);

    } catch (err) {
        respuesta = err.code === 11000
            ? construirRespuesta(respuestasValidas.PACIENTE_DUPLICADO, res, {}, cedula)
            : construirRespuesta(respuestasValidas.ERROR_INTERNO, res);
    }

    return respuesta;
};

const obtenerPacientes = async (_, res = response) => {
    const pacientes = await Paciente.find({}).lean();
    return construirRespuesta(respuestasValidas.PACIENTES_ENCONTRADOS, res, pacientes);
};

const actualizarPaciente = async (req, res = response) => {
    const update = req.body;

    try {
        const paciente = await Paciente.findOneAndUpdate({ '_id': update._id }, update);

        if (paciente) {
            return construirRespuesta(respuestasValidas.PACIENTE_ACTUALIZADO, res, { id: paciente._id });
        }

    } catch (err) {
        return construirRespuesta(respuestasValidas.ERROR_INTERNO, res);
    }
};

const busquedaPacientes = async (req, res = response) => {
    const txtSearch = req.params.search;

    if (txtSearch !== undefined && txtSearch.trim() !== '') {
        const finds = await Paciente.find({ $text: { $search: "\"" + txtSearch + "\"" } });

        return construirRespuesta(respuestasValidas.PACIENTE_ENCONTRADO, res, { patients: finds })
    }
    else {
        const finds = await Paciente.find({});
        res.status(200).json({ ok: true, msg: 'Necesitas buscar algo válido', pacientes: finds });
    }
};


module.exports = {
    crearPaciente,
    obtenerPacientes,
    actualizarPaciente,
    busquedaPacientes
};