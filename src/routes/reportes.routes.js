const {Router} = require ('express')
const { generarReportes } = require('../controllers/reportes.controller')
const {validarJWT} =  require ('../middlewares/middlewares')

const router = Router()

//Endpoint de reportes, metodo HTTP POST
router.post('/reportes/:reporte', validarJWT, generarReportes)



module.exports = router