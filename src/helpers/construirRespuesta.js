const construirRespuesta = (tipoRespuesta, res, payload = {}, valorMensajeDinamico = '') => {
    let { code, ok, msg } = tipoRespuesta;

    if (tipoRespuesta.requiereMensajeDinamico && valorMensajeDinamico.trim() !== '') {
        msg = msg.replace('[CAMBIO]', valorMensajeDinamico);
    }

    let body = {
        ok,
        msg
    };

    const payloadVacio = Object.keys(payload).length === 0;

    if (!payloadVacio) {
        body = { ...body, payload };
    }
    
    console.log(body);
    return res.status(code).json(body);
}

module.exports = {
    construirRespuesta
}