const { check, param } = require('express-validator');
const { erroresEnPeticion, } = require('../middlewares/middlewares');

const idParamCheck = [param('_id', 'El id es requerido').notEmpty()];

const pacienteSchema = [
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('apellido', 'El apellido es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('cedula', 'La fecha deseada es obligatorio').notEmpty(),
    check('numeroTelefonico', 'El numero telefonico es obligatorio').notEmpty(),
];

const userSchema = [
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('email', 'El email es obligatorio').isEmail(),
    check('lastName', 'El nombre es obligatorio').notEmpty(),
    check('user', 'El usuario es obligatorio').notEmpty(),
    check('pwd').notEmpty().withMessage('La contraseña es requerida')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe de tener al menos 6 caractéres')
];

const validators = {
    authValidators: {
        '/new': userSchema,
        '/login': [
            check('user', 'El nombre es obligatorio').not().isEmpty(),
            check('pwd', 'La contraseña es obligatoria').not().isEmpty()
        ],
    },
    citasValidators: {
        '/citas--POST': [
            check('paciente.nombre', 'El nombre es obligatorio').not().isEmpty(),
            check('paciente.apellido', 'El apellido es obligatorio').not().isEmpty(),
            check('paciente.email', 'El email es obligatorio').isEmail(),
            check('paciente.numeroTelefonico', 'El numero telefonico es obligatorio').not().isEmpty(),
            check('horario').not().isEmpty(),
        ],
        '/citas--PUT': [
            check('nombre', 'El nombre es obligatorio').notEmpty(),
            check('estado', 'El estado es obligatorio').notEmpty(),
            check('apellido', 'El apellido es obligatorio').notEmpty(),
            check('email', 'El email es obligatorio').isEmail(),
            check('fechaDeseada', 'La fecha deseada es obligatorio').notEmpty(),
            check('fechaCreada', 'La fecha creada es obligatorio').notEmpty(),
            check('numeroTelefonico', 'El numero telefonico es obligatorio').notEmpty(),
            check('_id', 'El id es requerido').notEmpty(),
            check('idPaciente', 'El id del paciente es requerido').optional().notEmpty()
        ],
        '/citas--DELETE': idParamCheck,
        '/citas/pacientes--GET': idParamCheck,
        '/citas/date--GET': [
            param('date', 'La fecha es requerida').notEmpty(),
        ],
        '/citas/_id--GET': idParamCheck,
        '/citas/_id--PUT': idParamCheck
    },
    filesValidators: {
        '/files/_id&fileName--GET': [
            ...idParamCheck,
            param('fileName', 'El nombre del archivo es requerido'),
        ],
        '/files/_id--GET': idParamCheck,
        //TODO make some investigation to validate images, files, blah
        '/files/_id--POST': idParamCheck,
        '/files/_id&fileName--DELETE': [
            ...idParamCheck,
            param('fileName', 'El nombre del archivo es requerido'),
        ],
    },
    homeValidators: {
        '/home--POST': [
            check('nombre', 'El nombre es obligatorio').notEmpty(),
            check('apellido', 'El apellido es obligatorio').notEmpty(),
            check('email', 'El email es obligatorio').isEmail(),
            check('fecha', 'La fecha deseada es obligatorio').notEmpty(),
            check('teléfono', 'El numero telefonico es obligatorio').notEmpty(),
        ],
    },
    pacientesValidators: {
        '/pacientes--POST': pacienteSchema,
        '/pacientes/search--GET': [
            param('search', 'El texto para la busqueda es requerido').notEmpty() 
        ],
        '/pacientes--PUT': pacienteSchema
    },
    reportesValidators: {
        '/reportes/reporte--POST': [
            param('reporte', 'El nombre del reporte es requerido').notEmpty(),
            check('from', 'La fecha desde donde empezar el reporte es requerida').optional({checkFalsy: true}).notEmpty(),
            check('until', 'La fecha hasta donde terminar el reporte es requerida').optional({checkFalsy: true}).notEmpty(),
            check('month', 'El mes para generar el reporte es requerido').optional({checkFalsy: true}).notEmpty(),
        ],
    },
    usersValidators: {
        '/users/id--POST': userSchema,
    }
};

Object.keys(validators).forEach((validator) => {
    Object.keys(validators[validator]).forEach((requestValidator) => {
        const toUpdate = validators[validator][requestValidator];
        toUpdate.push(erroresEnPeticion);
    });
});

module.exports = {
    validators
}