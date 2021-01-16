import {Router} from 'express'
import Proyect from '../models/proyectModel'
import Todo from '../models/todoModel'
import moment from 'moment'

const router = Router()

//main page, brings projects for the sidebar
router.get('/', isAuthenticated, async(req,res)=>{
    const {_id, user} = req.user;
    const proyects = await Proyect.find({"id_user" : _id})

    res.render('index', {
        'class': 'index',
        proyects,
        _id,
        user
    })
})

//specific page for a project
router.get('/:_id', isAuthenticated, async(req,res)=>{
    let idProyect = req.params._id,
        {_id, user} = req.user

    const proyects = await Proyect.find({"id_user" : _id }),
          todos = await Todo.find({"id_proyect" : `${idProyect}`}).lean()
          
    const currentProyect = proyects.filter(a=> a._id == idProyect)[0],
        {nombre_proyect} = currentProyect || ""

    todos.map(item=> item.fecha_limite = moment(item.fecha_limite).format("DD/MMM/YYYY"))

    res.render('index', {
        'class': 'index',
        proyects,
        idProyect,
        todos,
        _id,
        user,
        nombre_proyect
    })
})

//passport middleware to check authentication
function isAuthenticated (req, res, next){
    req.isAuthenticated()
        ? next()
        : res.redirect('/login')
}

export default router