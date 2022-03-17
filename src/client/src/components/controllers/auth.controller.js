export const areInputsValid = ({ email, name, pwd, confPwd, lastName, user }) => {
	let errs = {};

	if (email.trim().length === 0) errs.email = 'El correo es requerido';
	if (!/\S+@\S+\.\S+/.test(email)) errs.email = 'El correo es inválido';
	if (name.trim().length === 0) errs.name = 'Escribe un nombre válido';
	if (user.trim().length === 0) errs.user = 'Escribe un usuario válido';
	if (lastName.trim().length === 0) errs.lastName = 'Escribe un apellido válido';
	if (pwd.trim().length === 0) errs.pwd = 'Escribe una contraseña válida';
	if (confPwd.trim().length === 0) errs.confPwd = 'Confirmar tu contraseña es requerido';

	if (pwd !== confPwd) errs.pwdMatchError = 'Las contraseñas deberían de ser iguales';

	return errs;
};

export const areLoginInputsValid = ({ user, pwd }) => {

	let errs = {};

	if (user.trim().length === 0) errs.user = 'El usuario es requerido';
	if (pwd.trim().length === 0) errs.pwd = 'Escribe una contraseña válida';



	return errs;
};

