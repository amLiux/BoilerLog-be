export const arePacienteInputsValid = ({nombre, apellido, email, numeroTelefonico, cedula}) => {
    let errs = {}
    

    if (nombre.trim().length === 0)  errs.nombre = 'Escribe un nombre válido'
    if (cedula.trim().length === 0)  errs.cedula = 'Escribe una cédula válida'
    if (apellido.trim().length === 0)  errs.apellido = 'Escribe un nombre válido'
    if (email.trim().length === 0)  errs.email = 'Escribe un nombre válido'
    if (!/\S+@\S+\.\S+/.test(email))  errs.email = 'El correo es inválido'
    if (numeroTelefonico.trim().length === 0)  errs.numeroTelefonico = 'Escribe un nombre válido'

    return errs
}