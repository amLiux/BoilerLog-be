const {Router} = require ('express')
const {validarJWT} =  require ('../middlewares/middlewares')
const {obtenerArchivos, subirArchivo, borrarArchivo, descargarArchivo} = require ('../controllers/files.controller')
const router = Router()

//Endpoint de citas, metodo HTTP DELETE, primero válida el JWT con el middleware validar JWT
router.get('/files/:_id&:fileName', validarJWT, descargarArchivo)
//Endpoint de citas, metodo HTTP GET, primero válida el JWT con el middleware validarJWT y si es válido, responde con un estado 200 y un JSON con las citas
router.get('/files/:_id', validarJWT, obtenerArchivos)
//Endpoint de citas, metodo HTTP GET, primero válida el JWT con el middleware validarJWT y si es válido, responde con un estado 200 y un JSON con las citas
router.post('/files/:_id', validarJWT, subirArchivo)
//Endpoint de citas, metodo HTTP DELETE, primero válida el JWT con el middleware validar JWT
router.delete('/files/:_id&:fileName', validarJWT, borrarArchivo)




module.exports = router