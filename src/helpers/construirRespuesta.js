const { logger } = require("./logger");

const construirRespuesta = (tipoRespuesta, res, payload = {}, valorMensajeDinamico = '') => {
    let { code, ok, msg, notify } = tipoRespuesta;
    const requestId = res.getHeader('X-Request-Id');

    let body = {
        ok,
        requestId,
    };

    if (msg) {
        if (tipoRespuesta.requiereMensajeDinamico && valorMensajeDinamico.trim() !== '') {
            msg = msg.replace('[CAMBIO]', valorMensajeDinamico);
        }

        body = {
            ...body,
            msg,
        };
    }

    if (notify) {
        logger(requestId).error(msg, { ...payload });
        payload = {};
    }

    const payloadVacio = Object.keys(payload).length === 0;

    if (!payloadVacio) {
        body = { ...body, payload };
    }

    return res.status(code).json(body);
}

module.exports = {
    construirRespuesta
}