export const areCitaInputsValid = ({nombre, apellido, email, numeroTelefonico}) => {
    let errs = {}
    

    if (nombre.trim().length === 0)  errs.nombre = 'Escribe un nombre válido'
    if (apellido.trim().length === 0)  errs.apellido = 'Escribe un apellido válido'
    if (email.trim().length === 0)  errs.email = 'Escribe un email válido'
    if (!/\S+@\S+\.\S+/.test(email))  errs.email = 'El correo es inválido'
    if (numeroTelefonico.trim().length === 0)  errs.numeroTelefonico = 'Escribe un nombre válido'

    return errs
}