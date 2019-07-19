'use strict';

const eventListeners = e =>{
    setInterval(()=>{
        let reloj = moment().format('hh:mm:ss a');
        document.querySelector('#reloj div').innerHTML = reloj;
    });

};

const envioID = id => 
    axios.post('/google-signin', {
        idGoogle: `${id}`,
    })
    .then((response)=> console.log(response))
    .catch((error)=> console.log(error.status)); 


async function onSignIn(googleUser){
    var id_token = googleUser.getAuthResponse().id_token;
    await envioID(id_token);
}   


eventListeners();