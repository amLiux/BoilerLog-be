const {Router} = require ('express')
const Citas = require ('../models/CitasModel')
const {validarJWT} =  require ('../middlewares/middlewares')

const router = Router()

//Endpoint de citas, metodo HTTP GET, primero válida el JWT con el middleware validarJWT
router.get('/citas', validarJWT, async (req,res)=>{

    const citas = await Citas.find({}).lean()

    res.status(200).json({
        ok: true,
        citas
    })

})

module.exports = router