const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const Proyect = require('../models/proyectModel');
const Todo = require('../models/todoModel');
const moment = require('moment');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/', isAuthenticated,  async(req,res)=>{
    let {_id, user} = req.user;
    const proyects = await Proyect.find({"id_user" : _id});
    res.render('index', {
        'class': 'index',
        proyects,
        _id,
        user
    });
});

router.get('/:_id', isAuthenticated, async(req,res)=>{
    let idProyect = req.params._id,
        {_id, user} = req.user;

    const proyects = await Proyect.find({"id_user" : _id }),
          todos = await Todo.find({"id_proyect" : `${idProyect}`}).lean();
          
    let currentProyect = proyects.filter(a=> a._id == idProyect)[0],
        {nombre_proyect} = currentProyect || "";

    todos.map(item=> item.fecha_limite = moment(item.fecha_limite).format("DD/MMM/YYYY"))

    res.render('index', {
        'class': 'index',
        proyects,
        idProyect,
        todos,
        _id,
        user,
        nombre_proyect
    });
});


function isAuthenticated (req, res, next){
    if(req.isAuthenticated())
        return next();
    
    res.redirect('/login');
}

module.exports = router;