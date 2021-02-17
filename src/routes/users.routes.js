import {Router} from 'express'
import passport from 'passport'

const router  = Router()

router.get('/google-signIn', 
    passport.authenticate(
        'google', 
        {
            scope: ['profile', 'email']
        }
    )
    
)

router.get('/google-signIn/redirect', 
    passport.authenticate(
        'google', 
        {
            failureRedirect: '/login',
            successRedirect: '/'
        }
    ), (req, res) => res.redirect('/')
)


router.get('/login', (req,res)=> 
    res.render('login', {
        'class' : 'login'
    })
)

router.post('/login', passport.authenticate('authLoggeo', {
    successRedirect: '/',
    failureRedirect: '/login',
    passReqToCallback: true
}))


router.get('/logout', (req,res)=>{
    req.logout()
    res.redirect('/')
});

export default router