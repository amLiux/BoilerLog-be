const { response } = require ('express')
const Paciente = require('../models/PacientesModel')

const crearPaciente = async(req, res = response ) => {
    
    const {nombre, apellido, cedula, email, numeroTelefonico} = req.body

    try{

        const nuevoPaciente = new Paciente({
            nombre,
            apellido,
            cedula,
            email,
            numeroTelefonico
        })

        const createdUser = await nuevoPaciente.save()

        res.status(201).json({
            ok: true,
            msg: 'El paciente ha sido creado correctamente!',
            createdUser
        })


    }catch(err){
        //todo handle other type of error not just duplicated
        console.log(err)
    }

}

const obtenerPacientes = async(req, res = response ) => {
    const pacientes = await Paciente.find({}).lean()
    res.status(200).json({ok: true, pacientes})
}

const actualizarPaciente = async(req, res = response ) => {
    const update = req.body

    try{
        const paciente = await Paciente.findOneAndUpdate({'_id': update._id}, update)

        if(paciente){
            res.status(200).json({
                ok: true,
                msg: 'El valor se ha actualizado',
                id: paciente._id
            })
        }

    }catch(err){
        //TODO send error
        console.log(err)
    }
}

const cargarArchivo = async(req, res=response) => {
    console.log(req.files)
}

const busquedaPacientes = async(req, res=response) => {
    const txtSearch = req.params.search;
    
    console.log(txtSearch)

    if (txtSearch !== undefined && txtSearch.trim() !== ''){
        const finds = await Paciente.find( { $text: { $search: "\""+txtSearch+"\""} } );

        res.status(200).json({ok: true, msg: 'Se encontró esta información' + ' \u2193', pacientes: finds});
    }
    else{
        const finds = await Paciente.find({});
        res.status(200).json({ok:true, msg: 'Necesitas buscar algo válido', pacientes: finds});
    }
}


module.exports = {
    crearPaciente,
    obtenerPacientes,
    actualizarPaciente,
    cargarArchivo,
    busquedaPacientes
}