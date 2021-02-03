//TODO 

import User from '../models/userModel'
import bcrypt from 'bcrypt'
import nodemailer from 'nodemailer'
import randomstring from 'randomstring'
import config from '../config/config'
import { template } from 'handlebars'


//actualizar contraseña si tiene contraseña vieja
export const changePassword = (email, password, newPassword) => 
	new Promise((resolve, reject) => {
		//hace una busqueda al db buscando "email"
		User.find({ email: email })
            .then(users => {
                let user = users[0];
                const hashed_password = user.hashed_password;
                if (bcrypt.compareSync(password, hashed_password)) {
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(newPassword, salt);
                    user.hashed_password = hash;
                    return user.save();
                } else {
                    reject({ status: 401, message: 'Contraseña antigua inválida !' });
                }
            })
		.then(user => resolve({ status: 200, message: 'Contraseña actualizada correctamente !' }))
		.catch(err => reject({ status: 500, message: 'Error de servidor !' }));
	});

export const resetPasswordInit = email =>
	new Promise((resolve, reject) => {
		const random = randomstring.generate(8);
		User.find({ email: email })
            .then(users => {
                if (users.length == 0) {
                    reject({ status: 404, message: 'User Not Found !' });
                } else {
                    let user = users[0];
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(random, salt);
                    user.temp_password = hash;
                    user.temp_password_time = new Date();
                    return user.save();
                }
            })
            .then(user => {
                //const transporter = nodemailer.createTransport(`smtps://${config.email}:${config.password}@smtp.gmail.com`);
                const transporter = nodemailer.createTransport({
                    service: 'Gmail',
                    auth: {
                        user: `proyectoprograUTC@gmail.com`,
                        pass: `proyectoprogra1!`
                    }
                });

                const mailOptions = {
                    from: `"Administrador Proyecto Programacion 3 UTC" <proyectoprograUTC@gmail.com>`,
                    to: email,  
                    subject: 'Solicitud para restablecer contraseña', 
                    html: `
                    Hola ${user.name},
                        <br/><br/><br/>
                        Su token para reiniciar la contraseña es <b>${random}</b>. 
                    Sí estás viendo este correo desde un Android Device da click en este <a href="http://gymapp/${random}">link</a>. 
                    El token es válido por dos minutos.
                    Gracias,
                    GymApp.`

                };

                return transporter.sendMail(mailOptions);
            })
            .then(info => {
                resolve({ status: 200, message: 'Busca en tu correo las instrucciones' })
            })
            .catch(err => {
                reject({ status: 500, message: 'Intentalo más tarde !' });
            });
        });

export const resetPasswordFinish = (email, token, password) => 
	new Promise((resolve, reject) => {
		User.find({ email: email })
            .then(users => {
                let user = users[0];
                const diff = new Date() - new Date(user.temp_password_time); 
                const seconds = Math.floor(diff / 1000);
                console.log(`Seconds : ${seconds}`);
                if (seconds < 120) { return user; } else { reject({ status: 401, message: 'Time Out ! Try again' }); } }) .then(user => {
                if (bcrypt.compareSync(token, user.temp_password)) {
                    const salt = bcrypt.genSaltSync(10);
                    const hash = bcrypt.hashSync(password, salt);
                    user.hashed_password = hash;
                    user.temp_password = undefined;
                    user.temp_password_time = undefined;
                    return user.save();
                } else {
                    reject({ status: 401, message: 'Token Inválido !' });
                }
            })

            .then(user => resolve({ status: 200, message: 'Password nuevo!' }))
            .catch(err => reject({ status: 500, message: 'Internal Server Error !' }));

    });
    
export const notificarPeticiónCita = (email, nombre, apellido, teléfono, mensaje ) =>{

    //TODO creamos una petición sin revisar? 
    // solo notificamos?
    //const transporter = nodemailer.createTransport(`smtps://${config.email}:${config.password}@smtp.gmail.com`);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: config.googleAccount,
            pass: config.googlePwd
        }
    });

    const mailOptions = {
        from: `"Citas Doctores Maroto" <mjbacr97@gmail.com>`,
        to: email,
        bcc: [],
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

                <p>Esta es una notificación generada por la solicitud de una cita en nuestro sitio web. Queremos recordarle que nuestro equipo responde sus peticiones en menos de 24 horas.</p>
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