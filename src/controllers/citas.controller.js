const { response } = require ('express')
const Citas = require('../models/CitasModel')
const {crearPeticionDeCitaYGuardar} = require('../controllers/index.controller')


const obtenerCitas = async(req, res = response ) => {
    const citas = await Citas.find({}).lean()
    res.status(200).json({ok: true, citas})
}

const cancelarCita = async(req, res = response ) => {
    
    const id = req.params._id
    const citaToUpdate = await Citas.findOne({'_id': id})

    const update = {
        estado: 'CANCELADA',
        fechaDeseada: new Date(citaToUpdate.fechaDeseada.setHours(0))
    }

    try{

        const cita = await Citas.findOneAndUpdate({'_id': id}, update, {
            new: true
        })
        
        res.status(200).json({
            ok:true,
            msg: 'La cita se canceló',
            cita
        })

    }catch(err){
        res.status(500).json({
            ok:false,
            msg: err
        })
    }
}

const crearCita = async(req, res = response ) => {
    const {nombre, apellido, email, numeroTelefonico, _id: id} = req.body.paciente
    const {horario} = req.body


    try{
        const newCita = await crearPeticionDeCitaYGuardar(nombre, apellido, email, numeroTelefonico, horario, id)

        if(newCita._id){
            // const envioCorreo = await notificarPeticiónCitaAgendada(email, nombre, apellido, teléfono, dateCorreo, _id)
            res.status(201).json({
                ok:true,
                msg: 'La cita se creó correctamente',
                newCita
            })
        }

    }catch(err){
        res.status(500).json({
            ok: false,
            err,
            msg: 'Error interno de servidor!'
        })
    }

}


const actualizarCita = async(req, res = response ) => {
    const update = req.body



    try{
        const newCita = await Citas.findOneAndUpdate({'_id': update._id}, update, {new: true}).lean()

        if(newCita){
            res.status(200).json({
                ok: true,
                msg: 'El valor se ha actualizado',
                newCita: {...newCita}
            })
        }

    }catch(err){
        res.status(500).json({
            ok: false,
            msg: 'Error interno de servidor!'
        })
    }
}

const getOpcionesCita = async (req, res = response)=>{
    const id = req.params._id
    const [cita] = await Citas.find({'_id': id}).lean()
    

    if(cita.estado === 'AGENDADA')
        return res.redirect(301, 'http://localhost:3000/home.html')

    if(cita._id){
        const diaSiguiente = new Date(cita.fechaDeseada)
        diaSiguiente.setDate(cita.fechaDeseada.getDate()+1)
        const citasMismoDia = await Citas.find({fechaDeseada: { $gte: cita.fechaDeseada, $lt: diaSiguiente.toISOString() }})
        const horariosDisponibles = checkHorariosDisponibles(citasMismoDia)

        res.status(200).json({
            ok:true, 
            horariosDisponibles,
            nombre: cita.nombre,
            fecha: new Date(cita.fechaDeseada).toLocaleDateString()
        })
    }
}

const getOpcionesByPaciente = async (req, res = response)=>{
    const id = req.params._id
    const citas = await Citas.find({'idPaciente': id}).lean()

    res.status(200).json({ok: true, citas: [...citas]})
}


const getOpcionesCitaByDate = async (req, res = response)=>{
    const date = req.params.date
    const queryDate = new Date(date)
    const diaSiguiente = new Date(queryDate)
    diaSiguiente.setDate(queryDate.getDate()+1)
    const citasMismoDia = await Citas.find({fechaDeseada: { $gte: queryDate, $lt: diaSiguiente }})

    const horariosDisponibles = checkHorariosDisponibles(citasMismoDia, true)

    res.status(200).json({
        ok:true, 
        horariosDisponibles,
    })
    
}

const checkHorariosDisponibles = (citas, todos=false) => {
    const todosHorarios = todos ? 11 : 3
    let horariosTomados = []
    citas.map(cita => horariosTomados.push(cita.fechaDeseada.getHours()))
    const citasAgendadas = horariosTomados.filter(horario => horario !== 0)
    if(citasAgendadas.length === 0)
        return [...generadorDeRangos(7, 17).sort(() => Math.random() - Math.random()).slice(0, todosHorarios)]  
    else 
        return [...generadorDeRangos(7,17)].filter(horario => !citasAgendadas.includes(horario)).sort(() => Math.random() - Math.random()).slice(0, todosHorarios)
    
}

const generadorDeRangos = (start, end, length = end - start + 1) =>
    Array.from({ length }, (_, i) => start + i)


const actualizarHorario = async(req, res)=>{
    const id = req.params._id
    const {horario} = req.body

    const [cita] = await Citas.find({'_id': id}).lean()

    if(cita._id){
        const updatedFecha = {
            fechaDeseada: new Date(cita.fechaDeseada.setHours(horario)),
            estado: 'AGENDADA'
        }

        await Citas.findOneAndUpdate({_id: id}, updatedFecha);

        res.status(200).json({
            ok:true, 
            msg: 'La cita ha sido agendada, gracias!'
        })
    }
}

module.exports = {
    actualizarCita,
    obtenerCitas,
    getOpcionesCita,
    actualizarHorario,
    getOpcionesCitaByDate,
    crearCita,
    cancelarCita,
    getOpcionesByPaciente
}