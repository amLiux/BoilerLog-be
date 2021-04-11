const {Router} = require ('express')
const {crearCitaPublica} = require ('../controllers/index.controller')
const router = Router()

router.post('/home', crearCitaPublica)

module.exports = router