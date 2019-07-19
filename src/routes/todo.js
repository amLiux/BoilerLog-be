const express = require('express');
const router = express.Router();
const Todo = require('../models/todoModel');
const bodyParser = require('body-parser');
const moment = require('moment');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/:_id/new-todo/', isAuthenticated, async (req,res)=>{
    const {todo, todoDescription, id_proyecto, date_todo} = req.body;
    const {user} = req.user;
    const errors = [];

    if(!todo || todo.trim() === ""){
        errors.push({text: 'La tarea no puede tener un nombre en blanco!'});
    }

    if(!todoDescription || todoDescription.trim() === ""){
        errors.push({text: 'Debes describir la tarea!'});
    }

    if(!id_proyecto || id_proyecto.trim() === ""){
        errors.push({text: 'Debes estar dentro de un proyecto para agregar una tarea!'});
    }

    if(!date_todo || date_todo.trim() === ""){
        errors.push({text: 'La tarea debe de tener una fecha de entrega!'});
    }

    if(errors.length > 0){
        res.render('errorpage',{
            'class': 'index',
            errors,
            todo,
            user,
            id_proyecto
        });
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

router.put('/uptading-todo', async(req, res) =>{
    res.status(200);
});

function isAuthenticated (req, res, next){
    if(req.isAuthenticated())
        return next();
    
    res.redirect('/login');
}

module.exports = router;