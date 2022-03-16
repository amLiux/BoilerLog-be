const HTTPEnum = {
    CREATED: 201,
    INTERNAL_SERVER_ERROR: 500,
    CONFLICT: 409,
    NOT_FOUND: 404,
    UNAUTHORIZED: 403,
    OK: 200,
    BAD_REQUEST: 400,
}


const respuestasValidas = {
    USUARIO_CREADO: {
        code: HTTPEnum.CREATED,
        ok: true,
        msg: 'El usuario fue creado correctamente'
    },
    ERROR_INTERNO: {
        code: HTTPEnum.INTERNAL_SERVER_ERROR,
        ok: false,
        msg: 'Error interno de servidor!'
    },
    USUARIO_DUPLICADO: {
        code: HTTPEnum.CONFLICT,
        ok: false,
        msg: 'Este usuario ya existe en nuestra base de datos!'
    },
    USUARIO_DESACTIVADO: {
        code: HTTPEnum.UNAUTHORIZED,
        ok: false,
        msg: 'Usuario desactivado, consulte con su administrador!'
    },
    USUARIO_DESCONOCIDO: {
        code: HTTPEnum.NOT_FOUND,
        ok: false,
        msg: 'No se encontró el usuario [CAMBIO]',
        requiereMensajeDinamico: true
    },
    NO_AUTORIZADO: {
        code: HTTPEnum.UNAUTHORIZED,
        ok: false,
        msg: 'Contraseña incorrecta!'
    },
    LOGIN_CORRECTO: {
        code: HTTPEnum.OK,
        ok: true
    },
    TOKEN_VALIDADO: {
        code: HTTPEnum.OK,
        ok: true
    },
    CITA_CREADA: {
        code: HTTPEnum.CREATED,
        ok: true,
        msg: 'La cita se creó correctamente'
    },
    CITA_ACTUALIZADA: {
        code: HTTPEnum.OK,
        ok: true,
        msg: 'La cita se ha actualizado'
    },
    CITA_CANCELADA: {
        code: HTTPEnum.OK,
        ok: true,
        msg: 'La cita se canceló'
    },
    CITA_DESCONOCIDA: {
        code: HTTPEnum.NOT_FOUND,
        ok: false,
        msg: 'No se encontró la cita [CAMBIO]',
        requiereMensajeDinamico: true
    },
    PACIENTE_CREADO: {
        code: HTTPEnum.CREATED,
        ok: true,
        msg: 'El paciente [CAMBIO] ha sido creado correctamente',
        requiereMensajeDinamico: true
    },
    PACIENTE_DUPLICADO: {
        code: HTTPEnum.CONFLICT,
        ok: false,
        msg: 'La cédula [CAMBIO] ya existe en nuestra base de datos!',
        requiereMensajeDinamico: true
    },
    USUARIOS_ENCONTRADOS: {
        code: HTTPEnum.OK,
        ok: true
    },
    USUARIOS_DESCONOCIDOS: {
        code: HTTPEnum.NOT_FOUND,
        ok: false,
        msg: 'No se encontraron usuarios'
    },
    PETICION_SIN_ARCHIVOS: {
        code: HTTPEnum.BAD_REQUEST,
        ok: false,
        msg: 'No hay archivos para subir'
    },
    ARCHIVO_SUBIDO: {
        code: HTTPEnum.CREATED,
        ok: true,
        msg: 'El archivo se subió correctamente'
    },
    ARCHIVOS_ENCONTRADOS: {
        code: HTTPEnum.OK,
        ok: true
    },
    ARCHIVO_ELIMINADO: {
        code: HTTPEnum.OK,
        ok: true,
        msg: 'El archivo se eliminó correctamente'
    },
    ARCHIVO_DESCONOCIDO: {
        code: HTTPEnum.NOT_FOUND,
        ok: false,
        msg: 'El archivo no se encontro'
    },
    PACIENTE_ACTUALIZADO: {
        code: 200,
        ok: true,
        msg: 'El paciente se ha actualizado',
    },
    PACIENTES_ENCONTRADOS: {
        code: 200,
        ok: true,
    },
    PACIENTE_ENCONTRADO: {
        code: 200,
        ok: true,
        msg: 'Se encontró esta información' + ' \u2193',
    },
    CITAS_PACIENTE_ENCONTRADAS: {
        code: 200,
        ok: true,
    },
    CITAS_ENCONTRADAS: {
        code: 200,
        ok: true,
    },
    CITAS_FECHA_ENCONTRADAS: {
        code: 200,
        ok: true
    }
}


module.exports = {
    respuestasValidas,
}