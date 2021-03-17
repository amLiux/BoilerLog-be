import {Router} from 'express'
import passport from 'passport'

const router  = Router()

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