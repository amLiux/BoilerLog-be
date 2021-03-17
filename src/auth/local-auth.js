import passport from 'passport'
import LocalStrategy from 'passport-local'
import User from '../models/UserModel' 


passport.use(
    'authCuentaNueva', 
    new LocalStrategy({
        usernameField: 'username',
        passwordField: 'user_password',
        passReqToCallback: true
    }, 
    async (req, username, user_password, done)=>{
        const newUser = new User({user: username})
        newUser.pass = newUser.encriptarPassword(user_password)
        await newUser.save()		
            .then(() => done(null, newUser, req.flash('gMessage', 'Usuario registrado correctamente')))
            .catch(err => 
                err.code == 11000 
                    ? done(null, false, req.flash('bMessage', 'Usuario ya existe!' ))
                    : done(null, false, req.flash('bMessage', 'Error interno de servidor!'))
            )
    })
)


passport.serializeUser((user, done)=> done(null, user.id))

passport.deserializeUser(async (id, done)=>{
    const user = await User.findById(id)
    done(null, user)
})

passport.use('authLoggeo', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'user_password',
    passReqToCallback: true
}, async (req, username, user_password, done)=>{
    const user = await User.findOne({user: username});
    if(!user)
        return done(null, false, req.flash('bMessage', `No se encontró el usuario ${username}`));

    if(!user.compararPassword(user_password))
        return done(null, false, req.flash('bMessage', `Contraseña incorrecta`));

    //TODO ver como mandar id entre urls, porque asi no sirve
    done(null, user);
}));