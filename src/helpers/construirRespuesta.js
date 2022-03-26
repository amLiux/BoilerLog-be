const construirRespuesta = (tipoRespuesta, res, payload = {}, valorMensajeDinamico = '') => {
    let { code, ok, msg } = tipoRespuesta;

    let body = {
        ok,
    };

    if(msg) {
        if (tipoRespuesta.requiereMensajeDinamico && valorMensajeDinamico.trim() !== '') {
            msg = msg.replace('[CAMBIO]', valorMensajeDinamico);
        }
        
        body = {
            ...body,
            msg,
        };
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