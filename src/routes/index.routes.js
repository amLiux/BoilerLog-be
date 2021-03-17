const {Router} = require ('express')
const Citas = require ('../models/CitasModel')
// import moment from 'moment'
const {validarJWT} =  require ('../middlewares/middlewares')
const {notificarPeticiónCita, crearPeticionDeCitaYGuardar} = require ('../controllers/index.controller')


//TODO where to define this?
// moment.locale('es')

const router = Router()


//TODO move to home.routes.js
router.get('/home',(req, res) => res.render('home'))

router.get('/success',(req, res) => res.render('sucess'))

router.post('/home', async (req, res) => {
    const {nombre, apellido, email, teléfono, fecha} = req.body

    const date = moment(fecha, 'YYYY/MM/DD').toDate()
    const dateCorreo = new Date(date).toLocaleDateString('es-us')
    // TODO validacion de inputs
    // TODO whatsapp implementation

    const envioCorreo = await notificarPeticiónCita(email, nombre, apellido, teléfono, dateCorreo)

    const guardarCita = await crearPeticionDeCitaYGuardar(nombre, apellido, email, teléfono, date)
})

//Endpoint de citas, metodo HTTP GET, primero válida el JWT con el middleware validarJWT
router.get('/citas', validarJWT, async (req,res)=>{
    const {uid, name, rol} = req

    const citas = await Citas.find({}).lean()

    // const citasSinRevisar = obtenerCitasSinRevisar(citas)

    res.status(200).json({
        ok: true,
        citas
    })

    // if(rol === "ADMIN_ROLE") return res.redirect('/admin')

    // res.render('index', {
    //     'class': 'index',
    //     citasSinRevisar,
    //     _id,
    //     user
    // })
})

module.exports = router