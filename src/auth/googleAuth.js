const User = require('../models/userModel');

exports.guardarUsuarioGoogle = async ({given_name: user, email, img, google}) =>
    new Promise((resolve,reject) => {
        const newUser = new User();
        newUser.user = user;
        newUser.pass = newUser.encriptarPassword(email);
        newUser.img = img;
        newUser.google = google;

        newUser.save()
        .then(() => resolve({ status: 201, message: 'Usuario registrado correctamente!' }))
        .catch(err => {
            if (err.code == 11000) {
                reject({ status: 409, message: 'Usuario ya existe!' });
            } else {
                reject({ status: 500, message: 'Internal Server Error !' });
            }
        });
    });
