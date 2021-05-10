const {Router} = require ('express')
const {crearCitaPublica} = require ('../controllers/index.controller')
const router = Router()
const bcrypt = require ('bcrypt')

router.post('/home', crearCitaPublica)

router.get('/', (req, res) => res.redirect('/home'))


module.exports = router