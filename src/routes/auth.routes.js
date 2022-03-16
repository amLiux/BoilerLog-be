const express = require ('express')
const { check } = require ('express-validator')
const { crearUsuario, loginUsuario, revalidarToken } = require('../controllers/auth.controller')
const { erroresEnPeticion, validarJWT } = require ('../middlewares/middlewares')

const router = express.Router()

// Endpoint de registro, metodo HTTP POST, primero válida que el body contenga todos los parametros dentro del array definido abajo y luego pasa a llamar al metodo crear usuario dentro del controlador

router.post(
    '/new',
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El email es obligatorio').isEmail(),
        check('lastName', 'El nombre es obligatorio').not().isEmpty(),
        check('user', 'El usuario es obligatorio').not().isEmpty(),
        check('pwd').not().isEmpty().withMessage('La contraseña es requerida')
        .isLength({min: 6})
        .withMessage('La contraseña debe de tener al menos 6 caractéres') ,
        erroresEnPeticion
    ], 
    crearUsuario)

// Endpoint de autenticación, metodo HTTP POST, primero válida que el body contenga todos los parametros dentro del array definido abajo y luego pasa a llamar al metodo login usuario dentro del controlador

router.post(
    '/login',
    [
        check('user', 'El nombre es obligatorio').not().isEmpty(),
        check('pwd', 'La contraseña es obligatoria').not().isEmpty(),
        erroresEnPeticion
    ],
    loginUsuario)

router.get('/renew', validarJWT, revalidarToken)

module.exports = router