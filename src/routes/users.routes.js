import {Router} from 'express'
import passport from 'passport'

const router  = Router()

router.get('/crear-cuenta', (req,res)=>
    res.render('crear-cuenta',{
        'class' : 'crear-cuenta'
    })
)

router.post('/crear-cuenta', passport.authenticate('authCuentaNueva', {
    successRedirect: '/login',
    failureRedirect: '/crear-cuenta',
    passReqToCallback: true
}))

router.get('/login', (req,res)=> 
    res.render('login', {
        'class' : 'login'
    })
)

router.post('/login', passport.authenticate('authLoggeo', {
    successRedirect: '/',
    failureRedirect: '/login',
    passReqToCallback: true
}));


router.get('/logout', (req,res)=>{
    req.logout()
    res.redirect('/')
});

export default router