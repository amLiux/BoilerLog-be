const {Router} = require ('express');
const {validarJWT} =  require ('../middlewares/middlewares');
const { crearCita, obtenerCitas, actualizarCita, getOpcionesCita, actualizarHorario, getOpcionesCitaByDate, cancelarCita, obtenerCitasDePaciente } = require('../controllers/citas.controller');

const router = Router();

//Endpoint de citas, metodo HTTP GET, primero válida el JWT con el middleware validarJWT y si es válido, responde con un estado 200 y un JSON con las citas
router.get('/citas', validarJWT, obtenerCitas);

//Endpoint de citas, metodo HTTP GET, primero válida el JWT con el middleware validarJWT y si es válido, responde con un estado 200 y un JSON con las citas
router.post('/citas', validarJWT, crearCita);

//Endpoint de citas, metodo HTTP PUT, primero válida el JWT con el middleware validar JWT
router.put('/citas', validarJWT, actualizarCita);

//Endpoint de citas, metodo HTTP DELETE, primero válida el JWT con el middleware validar JWT
router.delete('/citas/:_id', validarJWT, cancelarCita);

router.get('/citas/:_id', getOpcionesCita);

router.get('/citas/paciente/:_id', obtenerCitasDePaciente);

router.get('/citas/date/:date', validarJWT, getOpcionesCitaByDate);

router.post('/citas/:_id', actualizarHorario);

module.exports = router;