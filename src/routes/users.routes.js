const {Router} = require ('express');
const { validators } = require('../constants/express-validators');
const { 
    updateUserDetails,
    obtenerTodosLosUsuarios
} = require('../controllers/users.controller');
const {validarJWT, checkRole} =  require ('../middlewares/middlewares');

const usersRouter = Router();

const {usersValidators} = validators;

//Endpoint de reportes, metodo HTTP POST
usersRouter.get('/users', validarJWT, obtenerTodosLosUsuarios);

//Endpoint de reportes, metodo HTTP POST
usersRouter.post(
    '/users/:_id',
    usersValidators['/users/id--POST'],
    checkRole,
    updateUserDetails
);

module.exports = usersRouter;