'use strict';

const eventListeners = e =>{
    setInterval(()=>{
        let reloj = moment().format('hh:mm:ss a');
        document.querySelector('#reloj div').innerHTML = reloj;
    });

};

eventListeners();

async function onSignIn(googleUser) {
    // const profile = googleUser.getBasicProfile()
    const {id_token} = googleUser.getAuthResponse()

    // try{
    //     const response = await fetch('/google-signIn', {
    //         method: 'POST',
    //         mode: 'cors',
    //         headers: {
    //           'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify({tokenGoogle: id_token})
    //       })
    // }catch(e){
    //     console.error(e)
    // }

}