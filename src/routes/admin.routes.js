import {Router} from 'express'
// import Proyect from '../models/proyectModel'
// import Todo from '../models/todoModel'
// import moment from 'moment'
import { checkRole } from '../middlewares/checkRole'
import User from '../models/userModel'
import passport from 'passport'


//TODO get all users request admin purposes

const router = Router()

//main page, brings projects for the sidebar
router.get('/admin', [isAuthenticated, checkRole], async(req,res)=>{
    const {_id, user, rol} = req.user
    const isAdmin = rol === "ADMIN_ROLE" ?  true : false
    let users
    
    try{
        users = await User.find({estado: true}, 'user rol google')
    }
    catch(error){
        users = undefined
    }

    res.render('admin', {
        'class': 'index',
        user,
        isAdmin,
        users
    })
})

router.get('/crear-cuenta', [isAuthenticated, checkRole], (req,res)=>{
    const {_id, user, rol} = req.user
    const isAdmin = rol === "ADMIN_ROLE" ?  true : false

    res.render('crear-cuenta',{
        'class' : 'index',
        user,
        isAdmin,
    })
})

//TODO update a user ? deactivate account/change password
//TODO nodemailert forgor password  ?

router.post('/crear-cuenta', [isAuthenticated, checkRole], passport.authenticate('authCuentaNueva', {
    successRedirect: '/login',
    failureRedirect: '/crear-cuenta',
    passReqToCallback: true
}))

//passport middleware to check authentication
function isAuthenticated (req, res, next){
    req.isAuthenticated()
        ? next()
        : res.redirect('/login')
}

export default router