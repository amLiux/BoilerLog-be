import passport from 'passport'
import {Strategy as GoogleStrategy} from 'passport-google-oauth20'
import config from '../config/config'
import User from '../models/userModel'

passport.use(
    new GoogleStrategy(
        {
            clientID: config.googleClient,
            clientSecret: config.googleSecret,
            callbackURL: 'http://localhost:3000/google-signIn/redirect',
            passReqToCallback: true
        },
        (req, accessToken, refreshToken, profile, done) => {
            const {email, given_name, family_name, picture} = profile._json,
                {id} = profile


            User.findOne({googleId: id})
                .then(async (currentUser)=>{

                    if (currentUser)
                        done(null, currentUser)
                        
                    else {  
                        const newUser = new User({
                            user: `${family_name.substring(0, family_name.length -4)}${given_name.substring(0, given_name.length -4)}${Math.floor(Math.random() * 101)}` ,
                            pass: ':)',
                            google: true,
                            img: picture,
                            googleId: id
                        })

                        await newUser.save()		
                            .then(() => done(null, newUser))
                            .catch(err => done(null, false, req.flash('bMessage', 'Error interno de servidor!')))
                    }   
                })
        }
    )

)
