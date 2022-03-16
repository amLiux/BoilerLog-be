const { response } = require('express');
const User = require('../models/UsuarioModel');
const generarJWT = require('../helpers/jwt');
const { construirRespuesta } = require('../helpers/construirRespuesta');
const { respuestasValidas } = require('../constants/HTTP');

// Gl3nd4D3s4rr0ll097!
// 2jgu5tjrPKku3r2
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
        const respuesta = err.code === 11000
            ? construirRespuesta(respuestasValidas.USUARIO_DUPLICADO, res)
            : construirRespuesta(respuestasValidas.ERROR_INTERNO, res);

        return respuesta;
    }
    return respuesta;
}

const loginUsuario = async (req, res = response) => {
    let respuesta;
    const { user, pwd } = req.body;

    try {
        const usuario = await User.findOne({ user });

        if (!usuario.estado) return construirRespuesta(respuestasValidas.USUARIO_DESACTIVADO, res);
        if (!usuario) return construirRespuesta(respuestasValidas.USUARIO_DESCONOCIDO, res, {}, user);
        if (!usuario.compararPassword(pwd)) construirRespuesta(respuestasValidas.NO_AUTORIZADO, res);

        const token = await generarJWT(usuario._id, usuario.user, usuario.rol);

        const payload = {
            uid: usuario._id,
            user,
            token,
            rol: usuario.rol
        };

        respuesta = construirRespuesta(respuestasValidas.LOGIN_CORRECTO, res, payload);


    } catch (err) {
        respuesta = construirRespuesta(respuestasValidas.ERROR_INTERNO, res);
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