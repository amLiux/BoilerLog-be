import {Router} from 'express'
import Proyect from '../models/proyectModel'
import Todo from '../models/todoModel'
import moment from 'moment'
import {notificarPeticiónCita} from '../controllers/index.controller'
import {crearPeticionDeCitaYGuardar} from '../controllers/index.controller'


const router = Router()

router.get('/home',(req, res) => res.render('home'))

router.post('/home', async (req, res) => {
    const {nombre, apellido, email, teléfono} = req.body

    // TODO ejecutar funcionalidad de notificar al cliente y al personal administrativo 
    const envioCorreo = await notificarPeticiónCita(email, nombre, apellido, teléfono)

    //TODO guardar solicitud de cita en db para mostrarla en el front-end
    const guardarCita = await crearPeticionDeCitaYGuardar(req.body)

    console.log(envioCorreo)
    console.log(guardarCita)
    res.render('home')
})

//main page, brings projects for the sidebar
router.get('/', isAuthenticated, async(req,res)=>{
    const {_id, user, rol} = req.user
    const proyects = await Proyect.find({id_user : _id})

    if(rol === "ADMIN_ROLE") return res.redirect('/admin')


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
          todos = await Todo.find({id_proyect : `${idProyect}`, estado_tarea: false}).lean()
          
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