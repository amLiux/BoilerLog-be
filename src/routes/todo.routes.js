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
        });
        await todoBeforeInsertion.save();

        res.status(200).redirect(`/${req.params._id}`);
    }
});

router.delete('/delete-todo', async(req,res)=>{
    let {nombre_proyect} = req.body;
    if(nombre_proyect){
        await Todo.deleteOne({nombre_tarea: nombre_proyect})
        .then(founded=>res.status(200).json({message: "Se borro tu tarea" , user: founded}))
        .catch(err=>res.status(500).json({err: err}));
    }
});

//TODO create this update
router.put('/uptading-todo', async(req, res) =>{
    res.status(200);
});

function isAuthenticated (req, res, next){
    if(req.isAuthenticated())
        return next();
    
    res.redirect('/login');
}

export default router