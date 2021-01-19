export const checkErrorsInRequest = ({todo, todoDescription, id_proyecto, date_todo}) => {
    const errors = []

    if(!todo || todo.trim() === ""){
        errors.push({text: 'La tarea no puede tener un nombre en blanco!'})
    }

    if(!todoDescription || todoDescription.trim() === ""){
        errors.push({text: 'Debes describir la tarea!'})
    }

    if(!id_proyecto || id_proyecto.trim() === ""){
        errors.push({text: 'Debes estar dentro de un proyecto para agregar una tarea!'})
    }

    if(!date_todo || date_todo.trim() === ""){
        errors.push({text: 'La tarea debe de tener una fecha de entrega!'})
    }

    return errors
}