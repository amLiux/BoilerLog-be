import {Router} from 'express'
import { checkRole, isAuthenticated } from '../middlewares/middlewares'
import User from '../models/UserModel'
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

router.get('/crear-cuenta', (req,res)=>{
    // const {_id, user, rol} = req.user
    // const isAdmin = rol === "ADMIN_ROLE" ?  true : false

    res.render('crear-cuenta',{
        'class' : 'index',
        // user,
        // isAdmin,
    })
})

router.post('/crear-cuenta', passport.authenticate('authCuentaNueva', {
    failureRedirect: '/crear-cuenta',
    passReqToCallback: true
}));

//TODO update a user ? deactivate account/change password
//TODO nodemailert forgor password  ?

export default router