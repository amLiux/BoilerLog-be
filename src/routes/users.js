const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport');
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.googleClient);
const {guardarUsuarioGoogle} = require('../auth/googleAuth');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.get('/crear-cuenta', (req,res)=>{
    res.render('crear-cuenta',{
        'class' : 'crear-cuenta'
    });
});

router.post('/crear-cuenta', passport.authenticate('authCuentaNueva', {
    successRedirect: '/login',
    failureRedirect: '/crear-cuenta',
    passReqToCallback: true
}));

router.get('/login', (req,res)=>{
    res.render('login', {
        'class' : 'login'
    });
});

router.post('/login', passport.authenticate('authLoggeo', {
    successRedirect: '/',
    failureRedirect: '/login',
    passReqToCallback: true
}));




router.post('/google-signin', async (req, res, done)=>{
    let {idGoogle} = req.body;
    if(idGoogle){
        const user = await verify(idGoogle)
            .catch(err=> res.status(403).json({ok: false, err}));
        
        await guardarUsuarioGoogle(user)
            .then(({status}) => status === 201 && res.send('Si serví'))
            //revisar ese done
            .catch(({status, message}) => done (res.status(status).json({message})));

    }else{
        res.status(401).json({ok:false, err: 'El perfil de google no es válido'})
    }
});

async function verify(idGoogle) {
    const ticket = await client.verifyIdToken({
        idToken: idGoogle,
        audience: process.env.googleClient,
    });
    const {picture: img, given_name, email} = ticket.getPayload();
    return {
        given_name,
        email,
        img, 
        google: true
    }
}

router.get('/logout', (req,res)=>{
    req.logout();
    // signOut();
    res.redirect('/');
});

// function signOut() {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () {
//       console.log('User signed out.');
//     });
// }

module.exports = router;