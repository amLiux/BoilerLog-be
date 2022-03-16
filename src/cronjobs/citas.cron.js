const Citas = require('../models/CitasModel')

async function updatingShitAutomatically(){
    await Citas.updateMany({
        fechaDeseada: {$lt: new Date().setHours(23, 59, 59, 0)},
        estado: {$nin: ['CANCELADA', 'COMPLETADA', 'PENDIENTE']} 
        
    }, {estado: 'COMPLETADA'})

    await Citas.updateMany({
        fechaDeseada: {$lt: new Date().setHours(23, 59, 59, 0)},
        estado: {$nin: ['CANCELADA', 'COMPLETADA', 'AGENDADA']} 
        
    }, {estado: 'CANCELADA'})

}

updatingShitAutomatically()