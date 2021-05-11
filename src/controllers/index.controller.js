const { response } = require ('express')
const nodemailer =  require ('nodemailer')
const moment = require('moment')
const Cita = require('../models/CitasModel')
const Paciente = require('../models/PacientesModel')

require('dotenv').config()


const crearCitaPublica = async(req, res = response ) => {
    const {nombre, apellido, email, teléfono, fecha} = req.body

    const date = moment(fecha, 'YYYY/MM/DD').toDate()

    const dateCorreo = new Date(fecha).toLocaleDateString('es-us')


    try{
        const {_id} = await crearPeticionDeCitaYGuardar(nombre, apellido, email, teléfono, date)

        if(_id){
            const envioCorreo = await notificarPeticiónCitaPendiente(email, nombre, apellido, teléfono, dateCorreo, _id)
            envioCorreo && res.redirect('/success.html')
        }

    }catch(err){
        res.status(500).json({
            ok: false,
            msg: 'Error interno de servidor!'
        })
    }


}

/* notificarPeticiónCita() recibe los siguientes parámetros 
    @nombre:String, 
    @apellido:String, 
    @email:String,
    @telefono: String,  

    Por medio del paquete nodemailer, enviamos un correo de notificacion al usuario utilizando una cuenta de Gmail definida en nuestra configuracion de ambiente (config) 
*/
const notificarPeticiónCitaPendiente = (email, nombre, apellido, teléfono, dateCorreo, _id ) =>{

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_ACCOUNT,
            pass: process.env.GMAIL_PWD
        }
    });

    const mailOptions = {
        from: `"Citas Doctores Maroto" <citasmaroto@gmail.com>`,
        to: email,
        bcc: ["mjbacr97@gmail.com", "stiven13alfa@outlook.com"],
        headers:{

        },
        subject: 'Petición de cita en revisión', 
        html: 
            `
            <div style="font-size: 1rem;">
                <p style="font-style:italic;">Hola ${nombre + " " + apellido}!</p>
                <br/>

                <p>Muchas gracias por contactar con Clínica Dental Doctores Maroto!</p>
                <br/>

                <p>Esta es una notificación generada por la solicitud de una cita en nuestro sitio web.</p>
                <br/>

                <p>Por favor, escoja una hora para su cita el día ${dateCorreo} en nuestro website: 
                    https://boiler-log.herokuapp.com/public/schedule/${_id}
                </p>
                <br/>

                <p>Nos pondremos en contacto ya sea por el número ${teléfono} o por este correo electrónico. </p>
                <br/>

                <p> Mientras, puedes encontrar más información de la clínica en nuestras redes sociales <p style="font-weight: bold;">&#64;drs.maroto</p> en Instagram y Facebook. </p> 
                <br/>

                <p>Muy pronto estaremos en contacto con usted!</p> 
                <br/>
            </div>

                Saludos, 
                <br/>

                Doctores Maroto
                <br/>

                Clínica dental
            `

    };

    return transporter.sendMail(mailOptions)

}


/* crearPeticionDeCitaYGuardar() recibe los siguientes parámetros 
    @nombre:String, 
    @apellido:String, 
    @email:String,
    @telefono: String,  
    @fecha: Date

    crea un objeto Cita y lo guarda en nuestra base de datos

*/
const crearPeticionDeCitaYGuardar = async(nombre, apellido, email, teléfono, fecha, idPaciente='') =>{

    try{

        const existingUser = await Paciente.find({email}) 

        const machoteCita = 
                idPaciente.length > 1 
                    ? {
                        nombre,
                        apellido,
                        estado: 'AGENDADA',
                        email,
                        numeroTelefonico: teléfono,
                        fechaDeseada: fecha,
                        idPaciente
                    }
                    : existingUser.length > 0 && Object.keys(existingUser[0]).length > 0 ? {
                            nombre: existingUser[0].nombre,
                            apellido: existingUser[0].apellido,
                            email: existingUser[0].email,
                            estado: 'PENDIENTE',
                            numeroTelefonico: existingUser[0].numeroTelefonico,
                            fechaDeseada: fecha,
                            idPaciente: existingUser[0]._id

                        }
                        : {
                            nombre,
                            apellido,
                            email,
                            numeroTelefonico: teléfono,
                            fechaDeseada: fecha,
                        }

        const citaNueva = new Cita(machoteCita)

        await citaNueva.save()

        if (citaNueva){
            return citaNueva
        }

    }catch(err){
        console.log(err)
    }
}

module.exports = {
    crearCitaPublica,
    crearPeticionDeCitaYGuardar
}