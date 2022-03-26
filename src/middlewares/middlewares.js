const { validationResult } = require('express-validator');
const { response } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const checkRole = (req, res = response, next) => {
    const token = req.header('Authorization');

    const { rol } = jwt.verify(token, process.env.API_SEED);

    //TODO we can add multi-role validation in here in case of needed for admin endpoints like user update, or for support roles.

    rol !== 'ADMIN_ROLE'
        ? res.status(401).json({ ok: false, err: 'No estas autorizado.' })
        : next();

}

const isAuthenticated = (req, res, next) => {
    req.isAuthenticated()
        ? next()
        : res.redirect('/login');
}

const erroresEnPeticion = (req, res = response, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}

const validarJWT = (req, res = response, next) => {
    const token = req.header('Authorization');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Se necesita un token de autorización'
        });
    }

    try {
        const { uid, name, rol } = jwt.verify(token, process.env.API_SEED);
        req.uid = uid;
        req.name = name;
        req.rol = rol;
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }

    next();
}

module.exports = {
    checkRole,
    isAuthenticated,
    erroresEnPeticion,
    validarJWT
}