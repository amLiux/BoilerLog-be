const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/userModel');


passport.use('authCuentaNueva', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'user_password',
    passReqToCallback: true
}, async (req, username, user_password, done)=>{
    const user = new User();
    user.user = username;
    user.pass = user.encriptarPassword(user_password);
    await user.save()		
        .then(() => done(null, user, req.flash('gMessage', 'Usuario registrado correctamente')))
        .catch(err => {
            if (err.code == 11000) {
                return done(null, false, req.flash('bMessage', 'Usuario ya existe!' ));
            } else {
                return done(null, false, req.flash('bMessage', 'Error interno de servidor!'));
            }
        });
}));


passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
    const user = await User.findById(id);
    done(null, user);
});

passport.use('authLoggeo', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'user_password',
    passReqToCallback: true
}, async (req, username, user_password, done)=>{
    const user = await User.findOne({user: username});
    if(!user)
        return done(null, false, req.flash('bMessage', `No se encontro el usuario ${username}`));

    if(!user.compararPassword(user_password))
        return done(null, false, req.flash('bMessage', `Contraseña incorrecta`));

    //ver como mandar id entre urls, porque asi no sirve
    done(null, user, req.flash('_id', `${user._id}`));
}));