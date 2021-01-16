'use strict';

const eventListeners = e =>{
    setInterval(()=>{
        let reloj = moment().format('hh:mm:ss a');
        document.querySelector('#reloj div').innerHTML = reloj;
    });

};

eventListeners();