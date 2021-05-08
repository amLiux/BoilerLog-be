const cron = require('node-cron')
const Citas = require('../models/CitasModel')


cron.schedule('59 23 * * *', async () => 
    await Citas.updateMany({
        fechaDeseada: {$lt: new Date().setHours(23, 59, 59, 0)},
        estado: {$nin: ['CANCELADA', 'COMPLETADA']} 
        
    }, {estado: 'COMPLETADA'}) 
)