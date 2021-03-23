const {Router} = require ('express')
const Citas = require ('../models/CitasModel')
const {validarJWT} =  require ('../middlewares/middlewares')

const router = Router()

//Endpoint de citas, metodo HTTP GET, primero válida el JWT con el middleware validarJWT y si es válido, responde con un estado 200 y un JSON con las citas
router.get('/citas', validarJWT, async (req,res)=>{
    const citas = await Citas.find({}).lean()
    res.status(200).json({ok: true, citas})
})

//Endpoint de citas, metodo HTTP PUT, primero válida el JWT con el middleware validar JWT
router.put('/citas', validarJWT, async (req, res)=>{

    const update = req.body

    try{
        const cita = await Citas.findOneAndUpdate({'_id': update._id}, update)

        if(cita){
            res.status(200).json({
                ok: true,
                msg: 'El valor se ha actualizado',
                id: cita._id
            })
        }

    }catch(err){
        //TODO send error
        console.log(err)
    }
    
})

module.exports = router