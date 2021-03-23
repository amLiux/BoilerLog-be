const {Router} = require ('express')
const Pacientes = require ('../models/CitasModel')
const {validarJWT} =  require ('../middlewares/middlewares')

const router = Router()

//Endpoint de pacientes, metodo HTTP GET, primero válida el JWT con el middleware validarJWT y si es válido, responde con un estado 200 y un JSON con los pacientes
router.get('/pacientes', validarJWT, async (req,res)=>{
    const pacientes = await Pacientes.find({}).lean()
    res.status(200).json({ok: true, pacientes})
})

//Endpoint de citas, metodo HTTP PUT, primero válida el JWT con el middleware validar JWT

router.put('/pacientes', validarJWT, async (req, res)=>{

    const update = req.body

    try{
        const paciente = await Pacientes.findOneAndUpdate({'_id': update._id}, update)

        if(paciente){
            res.status(200).json({
                ok: true,
                msg: 'El valor se ha actualizado',
                id: paciente._id
            })
        }

    }catch(err){
        console.log(err)
    }
    



})

module.exports = router