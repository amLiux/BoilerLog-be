import {Router} from 'express'
import Proyect from '../models/proyectModel'

const router = Router()

router.post('/new-proyect', isAuthenticated, async (req,res)=>{
    const {newProyect, _id} = req.body
    const {user} = req.user

    //TODO checkErrors controller
    //TODO delete project

    const errors = []

    if(!newProyect || newProyect.trim() === "")
        errors.push({text: 'Por favor escriba el nombre del proyecto!'})
    

    if(errors.length > 0){
        res.render('errorpage',{
            errors,
            user,
        })
    }else{
        const proyectBeforeInsertion = new Proyect({
            nombre_proyect : newProyect,
            id_user : _id
        })
        let answer = await proyectBeforeInsertion.save()
        res.redirect(`/${answer._id}`)
    }
})

function isAuthenticated (req, res, next){
    if(req.isAuthenticated())
        return next();
    
    res.redirect('/login');
}

export default router