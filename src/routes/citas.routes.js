const {Router} = require ('express')
const {validarJWT} =  require ('../middlewares/middlewares')
const { obtenerCitas, actualizarCita, getOpcionesCita, actualizarHorario } = require('../controllers/citas.controller')

const router = Router()

//Endpoint de citas, metodo HTTP GET, primero válida el JWT con el middleware validarJWT y si es válido, responde con un estado 200 y un JSON con las citas
router.get('/citas', validarJWT, obtenerCitas)

//Endpoint de citas, metodo HTTP PUT, primero válida el JWT con el middleware validar JWT
router.put('/citas', validarJWT, actualizarCita)

//Endpoint de citas, metodo HTTP POST, envia las opciones de horarios dependiendo de la hora seleccionada por el usuario
router.get('/citas/:_id', getOpcionesCita)

//Endpoint de citas, metodo HTTP POST, envia las opciones de horarios dependiendo de la hora seleccionada por el usuario
router.post('/citas/:_id', actualizarHorario)

module.exports = router