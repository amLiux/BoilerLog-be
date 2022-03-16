const {Router} = require ('express')
const { updateUserDetails, obtenerTodosLosUsuarios } = require('../controllers/users.controller')
const {validarJWT} =  require ('../middlewares/middlewares')

const router = Router()

//Endpoint de reportes, metodo HTTP POST
router.get('/users', validarJWT, obtenerTodosLosUsuarios)

//Endpoint de reportes, metodo HTTP POST
router.post('/users/:_id', validarJWT, updateUserDetails)


module.exports = router