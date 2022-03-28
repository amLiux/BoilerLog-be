const { response } = require('express');
const User = require('../models/UsuarioModel');
const generarJWT = require('../helpers/jwt');
const { construirRespuesta } = require('../helpers/construirRespuesta');
const { respuestasValidas } = require('../constants/HTTP');
const { obtenerLoggableBody } = require('../helpers/logger');


// TODO BL-13-JSDocsSpike, do we want to document our code like this?
/**
 * This method does...
 *
 * @method
 * @name MessageQueueConnector#connectAndSubscribe
 * @param {string} whatever Whatever this is.
 * @returns {Object} Description of return value.
 * @throws {SomeException} blah.
 */
const crearUsuario = async (req, res = response) => {
    let respuesta;
    const { user, name, lastName, email, pwd, admin } = req.body;

    const rol = admin ? 'ADMIN_ROLE' : 'USER_ROLE';

    try {
        const nuevoUsuario = new User({
            user,
            nombre: name,
            email,
            apellido: lastName,
            rol
        });

        nuevoUsuario.pass = nuevoUsuario.encriptarPassword(pwd);

        await nuevoUsuario.save();

        respuesta = construirRespuesta(respuestasValidas.USUARIO_CREADO, res, nuevoUsuario);
    } catch (err) {
        const loggablePayload = obtenerLoggableBody(req, err);

        const respuesta = err.code === 11000
            ? construirRespuesta(respuestasValidas.USUARIO_DUPLICADO, res)
            : construirRespuesta(respuestasValidas.ERROR_INTERNO, res, loggablePayload);

        return respuesta;
    }
    return respuesta;
}

const loginUsuario = async (req, res = response) => {
    let respuesta;
    const { user, pwd } = req.body;

    try {
        const usuario = await User.findOne({ user });
        const loggablePayload = obtenerLoggableBody(req);

        if (!usuario) return construirRespuesta(respuestasValidas.USUARIO_DESCONOCIDO, res, loggablePayload, user);
        
        if (!usuario.estado) return construirRespuesta(respuestasValidas.USUARIO_DESACTIVADO, res, loggablePayload);
        
        if (!usuario.compararPassword(pwd)) return construirRespuesta(respuestasValidas.NO_AUTORIZADO, res, loggablePayload);
        

        const token = await generarJWT(usuario._id, usuario.user, usuario.rol);

        const payload = {
            uid: usuario._id,
            user,
            token,
            rol: usuario.rol
        };

        respuesta = construirRespuesta(respuestasValidas.LOGIN_CORRECTO, res, payload);


    } catch (err) {
        const loggablePayload = obtenerLoggableBody(req, err);
        respuesta = construirRespuesta(respuestasValidas.ERROR_INTERNO, res, loggablePayload);
        return respuesta;
    }

    return respuesta;
}

const revalidarToken = async (req, res = response) => {
    const { uid, name, rol } = req;

    const token = await generarJWT(uid, name, rol);

    const payload = {
        uid,
        name,
        rol,
        token
    };

    const respuesta = construirRespuesta(respuestasValidas.TOKEN_VALIDADO, res, payload);

    return respuesta;
}

module.exports = {
    crearUsuario,
    loginUsuario,
    revalidarToken
}