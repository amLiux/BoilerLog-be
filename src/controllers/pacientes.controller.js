const { response } = require ('express')
const Paciente = require('../models/PacientesModel')
const Citas = require('../models/CitasModel')

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

        await Citas.updateMany({email}, {
            "idPaciente": createdUser.idPaciente,
            "email": email,
            "numeroTelefonico": numeroTelefonico,
            "nombre": nombre,
            "apellido": apellido

        })
        
        res.status(201).json({
            ok: true,
            msg: 'El paciente ha sido creado correctamente!',
            createdUser
        })


    }catch(err){
        res.status(500).json({
            ok: false,
            msg: 'Error interno de servidor!'
        })
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
        res.status(500).json({
            ok: false,
            msg: 'Error interno de servidor!'
        })
    }
}


const busquedaPacientes = async(req, res=response) => {
    const txtSearch = req.params.search;
    
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
    busquedaPacientes
}