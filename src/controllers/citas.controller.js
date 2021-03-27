const { response } = require ('express')
const Citas = require('../models/CitasModel')



const obtenerCitas = async(req, res = response ) => {
    const citas = await Citas.find({}).lean()
    res.status(200).json({ok: true, citas})
}

const actualizarCita = async(req, res = response ) => {
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
}

const getOpcionesCita = async (req, res = response)=>{
    const id = req.params._id
    const [cita] = await Citas.find({'_id': id}).lean()

    if(cita.estado === 'AGENDADA')
        return res.redirect(301, 'http://localhost:3001/')

    if(cita._id){
        const diaSiguiente = new Date(cita.fechaDeseada);
        diaSiguiente.setDate(cita.fechaDeseada.getDate()+1)
        const citasMismoDia = await Citas.find({fechaDeseada: { $gte: cita.fechaDeseada, $lt: diaSiguiente.toISOString() }, estado: 'PENDIENTE_CONFIRMACION' });
        
        console.log(citasMismoDia)
        
        const horariosDisponibles = checkHorariosDisponibles(citasMismoDia)

        res.status(200).json({
            ok:true, 
            horariosDisponibles,
            nombre: cita.nombre,
            fecha: new Date(cita.fechaDeseada).toLocaleDateString()
        })
    }
}

const checkHorariosDisponibles = (citas) => {
    let horariosTomados = []
    citas.map(cita => horariosTomados.push(cita.fechaDeseada.getHours()))
    const citasAgendadas = horariosTomados.filter(horario => horario !== 0)
    if(citasAgendadas.length === 0)
        return [...generadorDeRangos(7, 17).sort(() => Math.random() - Math.random()).slice(0, 3)]  
    else {
        console.log([...generadorDeRangos(7,17)].filter(horario => !citasAgendadas.includes(horario)))
        return [...generadorDeRangos(7,17)].filter(horario => !citasAgendadas.includes(horario)).sort(() => Math.random() - Math.random()).slice(0, 3)
    }

    
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
    actualizarHorario
}