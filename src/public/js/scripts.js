"use strict";
const formProyects = document.querySelector("form#enviarNuevoProyect")
const listaProyects = document.querySelector("ul#proyectos")


//TODO move to different directory
const fetchCompleteTodo = async (id, estado_tarea) => 
    await fetch('/completing-todo', {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          todoId: id,
          estado_tarea: estado_tarea,
        }),
    })
    .then(response => response.json())
    .then(parsedResponse => parsedResponse)
    .catch(err => err)
    
const fetchDeleteTodo = async (id) => 
    await fetch('/delete-todo', {
        method: 'DELETE',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({todoId: id}),
    })
    .then(response => response.json())
    .then(parsedResponse => parsedResponse)
    .catch(err => err)

const showError = (err) => {
    console.error(err)
    swal("Error", "Ha ocurrido un error en nuestros servidores! Reintentar?", "warning",  {buttons: ["No!", "Si!"]}) 
}
const reloadPage = () => setTimeout(()=> document.location.reload() , 2000)


const eventListeners = () => {
  //codigo para el datepicker de bootstrap + jquery
  $(".input-group.date").datepicker({
    format: "dd/mm/yyyy",
    autoclose: true,
    orientation: "bottom left",
  })

  document.querySelector(".crear-proyecto a").addEventListener('click', (e) => {
    e.preventDefault()
    let inputNuevoProyect = document.createElement("li")
    inputNuevoProyect.innerHTML = `
        <div class="input-group mb-3">
            <div class="input-group-prepend">
                <span class="input-group-text" id="basic-addon1"><i class="far fa-clipboard"></i></span>
            </div>
            <input autofocus id="newProyect" name="newProyect" type="text" class="form-control" placeholder="Nombre del Proyecto">
        </div>
        `;

    formProyects.append(inputNuevoProyect)
    let dataNewProyect = document.querySelector("#newProyect")

    dataNewProyect.addEventListener('keypress', (e) => {
      let tecla = e.which || e.keyCode;
      if (tecla === 13) {
        inputNuevoProyect.hidden = true;
      }
    });
  })

  const todos = document.querySelectorAll('.clickeable')
  if (todos)
    for (const todo of todos) 
      todo.addEventListener('click', async (e) => {
        e.preventDefault()
        const todoId = e.target.parentElement.parentElement.id
        const targetDiv = document.getElementById(todoId).parentElement.parentElement

        if (e.target.classList.contains('btn-success')) {
            if (targetDiv.classList.contains('completo')) {
                const {ok, message} = await fetchCompleteTodo(todoId, false)

                ok
                    ? targetDiv.classList.remove('completo')
                    : showError(message)
            } 
            else 
                swal(
                    'Estás seguro?', 
                    'Vas a completar esta tarea permanentemente y se eliminara!', 
                    'warning',  
                    {buttons: ['No!', 'Si!']} 
                )
                .then(async update => {
                    if (update){
                        const {ok, message} = await fetchCompleteTodo(todoId, true)

                        if (!ok)
                            showError(message)
                        else { 
                            targetDiv.classList.add('completo')
                            reloadPage()
                        }
                    }
                })
                .catch(err => showError(err))

        }

        if(e.target.classList.contains('btn-danger')){
            swal(
                'Estás seguro?', 
                'Vas a borrar esta tarea permanentemente!', 
                'warning',  
                {buttons: ['No!', 'Si!']} 
            )
            .then(async deleted =>{
                if(deleted){
                    const {ok, message} = await fetchDeleteTodo(todoId)

                    !ok 
                        ? showError(message)
                        : reloadPage()
                }

            })
            .catch(err=> showError(err))
        }

        //TODO modal form to update task
        if(e.target.classList.contains('btn-primary')){
            console.log(`Hola`)
        }

      })
    

  // TODO create onCLick listener for admin
}

eventListeners()
