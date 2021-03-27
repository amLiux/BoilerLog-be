const {Router} = require ('express')
const { validarJWT } =  require ('../middlewares/middlewares')
const { crearPaciente, obtenerPacientes, actualizarPaciente } = require('../controllers/pacientes.controller')
const router = Router()

//Endpoint de pacientes, metodo HTTP GET, primero válida el JWT con el middleware validarJWT y si es válido, responde con un estado 200 y un JSON con los pacientes
router.get('/pacientes', validarJWT, obtenerPacientes)

//Endpoint de pacientes, metodo HTTP POST, primero válida el JWT con el middleware validar JWT y si es válido, continua con la lógica para crear un paciente
 router.post('/pacientes', validarJWT, crearPaciente)

//Endpoint de pacientes, metodo HTTP PUT, primero válida el JWT con el middleware validar JWT y si es válido, continua con la lógica para actualizar el paciente
router.put('/pacientes', validarJWT, actualizarPaciente)

module.exports = router