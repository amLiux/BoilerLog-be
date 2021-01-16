'use strict';
const formProyects = document.querySelector('form#enviarNuevoProyect');
const listaProyects = document.querySelector('ul#proyectos');

const eventListeners = () => {
    //codigo para el datepicker de bootstrap + jquery
    $('.input-group.date').datepicker({
        format: "dd/mm/yyyy",
        autoclose: true,
        orientation: "bottom left"
    });

    document.querySelector('.crear-proyecto a').addEventListener('click', e =>{
        e.preventDefault();
        let inputNuevoProyect = document.createElement('li');
        inputNuevoProyect.innerHTML = 
        `
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><i class="far fa-clipboard"></i></span>
            </div>
            <input autofocus id="newProyect" name="newProyect" type="text" class="form-control" placeholder="Nombre del Proyecto">
        </div>
        `;

        formProyects.append(inputNuevoProyect);
        let dataNewProyect = document.querySelector('#newProyect');

        dataNewProyect.addEventListener('keypress', e =>{
            let tecla = e.which || e.keyCode;
            if (tecla === 13){
                inputNuevoProyect.hidden = true;
            }
        });
    }); 

    const todos = document.querySelectorAll(".clickeable");
    if(todos)
        for (const todo of todos) {
            todo.addEventListener('click',  e =>{
                e.preventDefault();
                if(e.target.classList.contains('btn-success')){
                    let targetElement = e.target.parentElement.parentElement;
                    let nombre = e.target.parentElement.children[0].getElementsByTagName('p')[0].innerText;
                    console.log(nombre);
                    if(targetElement.classList.contains('completo')) {
                        targetElement.classList.remove('completo');
                        axios({
                            method: 'PUT',
                            url: '/updating-todo',
                            data: { 
                                nombre_proyect: nombre,
                                actualState: 1
                            },
                        })
                        .then(response=>console.log(response))
                        .catch(err => console.log(err));
                    }else{
                        targetElement.classList.add('completo');
                        axios({
                            method: 'PUT',
                            url: '/updating-todo',
                            data: { 
                                nombre_proyect: nombre,
                                actualState: 0
                                }
                        })
                        .then(response=>console.log(response))
                        .catch(err => console.log(err));
                    }
                }
    
                if(e.target.classList.contains('btn-danger')){
                    let nombre = e.target.parentElement.children[0].getElementsByTagName('p')[0].innerText;
                    swal("Estás seguro?", "Vas a borrar esta tarea permanentemente!", "warning",  {buttons: ["No!", "Si!"]} )
                    .then(deleted =>{
                        if(deleted)
                            axios({
                                    method: 'DELETE',
                                    url: '/delete-todo',
                                    data: {
                                        nombre_proyect: nombre
                                    }
                                })
                                .then(response=>{ 
                                    response.data.message === "Se borro tu tarea" && swal("Borrada", "Tu tarea fue eliminada exitosamente", "success");
                                    setTimeout(()=>{
                                        document.location.reload(true);
                                    },2000)

                                })
                                .catch(err => swal("Error", "Ha ocurrido un error en nuestros servidores! Reintentar?", "warning",  {buttons: ["No!", "Si!"]}));
                    })
                    .catch(err=>console.log(err));
                }
            }); //Guardar proyectos en la DB.
        }
    
    // document.querySelector("#calendar #calendar_content").addEventListener('click', e =>{
    //     if(e.target.classList.contains("day_click") && !e.target.classList.contains("blank")){
    //         swal({
    //             title: "Actividades de hoy!",
    //             text: "Get pussy",
    //           });
    //     }
    // });


}




eventListeners();