const {Router} = require ('express')
const {crearCitaPublica} = require ('../controllers/index.controller')
const path = require('path');
const router = Router()

router.get('/home',(req, res) =>{ 
    res.sendFile(path.join(__dirname + '/index.html'));
})

router.post('/home', crearCitaPublica)

module.exports = router