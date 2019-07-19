const express = require('express');
const router = express.Router();
const Proyect = require('../models/proyectModel');
const bodyParser = require('body-parser');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.post('/new-proyect', isAuthenticated, async (req,res)=>{
    const {newProyect, _id} = req.body;
    const {user} = req.user;
    const errors = [];

    if(!newProyect || newProyect.trim() === ""){
        errors.push({text: 'Por favor escriba el nombre del proyecto!'});
    }

    if(errors.length > 0){
        res.render('errorpage',{
            errors,
            user,
        });
    }else{
        const proyectBeforeInsertion = new Proyect({
            nombre_proyect : newProyect,
            id_user : _id
        });
        let answer = await proyectBeforeInsertion.save();
        res.redirect(`/${answer._id}`);
    }
});

function isAuthenticated (req, res, next){
    if(req.isAuthenticated())
        return next();
    
    res.redirect('/login');
}

module.exports = router;