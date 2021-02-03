import {Router} from 'express'
import Todo from '../models/todoModel'
import moment from 'moment'
import { checkErrorsInRequest } from '../controllers/todo.controller'

const router = Router()

router.post('/:_id/new-todo/', isAuthenticated, async (req,res)=>{
    const {todo, todoDescription, id_proyecto, date_todo} = req.body
    const {user} = req.user

    const errors = checkErrorsInRequest(req.body)

    if(errors.length > 0){
        res.render('errorpage',{
            'class': 'index',
            errors,
            todo,
            user,
            id_proyecto
        })
    }else{
        const todoBeforeInsertion = new Todo({
            nombre_tarea : todo,
            descripcion_tarea: todoDescription,
            fecha_limite : moment(date_todo, "DD/MM/YYYY").toDate(),
            id_proyect: id_proyecto
        })
        await todoBeforeInsertion.save()

        res.status(200).redirect(`/${req.params._id}`)
    }
})

router.delete('/delete-todo', async(req,res)=>{
    let {todoId} = req.body
    todoId 
        ? await Todo.deleteOne({_id: todoId})
        .then(founded=>res.status(200).json({ok: true, message: "Se borro tu tarea" , user: founded}))
        .catch(err=>res.status(500).json({ok:false, err: err}))
    :
        res.status(400).json({ok:false, message:'Un id es necesario para borrar una tarea'})
})

router.put('/completing-todo', async(req, res) =>{
    const {todoId, estado_tarea} = req.body

    await Todo.findOneAndUpdate({_id: todoId }, {estado_tarea})
    .then(founded=>res.status(200).json({ok:true, message: `La tarea ${founded.nombre_tarea} se actualizó`}))
    .catch(err=> res.status(500).json({ok:false, message: error}))
    
})



function isAuthenticated (req, res, next){
    if(req.isAuthenticated())
        return next();
    
    res.redirect('/login');
}

export default router