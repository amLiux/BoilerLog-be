import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sendToast } from '../../actions/ui';
import { startRegularRegister } from '../../actions/users';
import { arePacienteInputsValid } from '../controllers/pacientes.controller';
import { useForm } from './useForm';

export const useRegister = () => {
	const [admin, setAdmin] = useState(false);

	const dispatch = useDispatch();

	// let formState;

	const handleRegister = () => {
		dispatch(startRegularRegister({ ...values, admin }));
		reset();
	};

	// isEdit ? formState = pacienteActivo : formState = {
	//     nombre: '',
	//     apellido: '',
	//     cedula: '',
	//     email: '',
	//     numeroTelefonico: ''
	// };

	const [values, handleInputChange, handleSubmit, errors, reset] = useForm({
		email: '',
		user: '',
		name: '',
		lastName: '',
		pwd: '',
		confPwd: '',
	}, arePacienteInputsValid, handleRegister);


	useEffect(() => {
		if (Object.keys(errors).length === 1) {
			const errorMessage = errors[Object.keys(errors)[0]];
			dispatch(sendToast(errorMessage, false));
		}
	}, [errors, dispatch]);

	return [values, errors, handleInputChange, handleSubmit, setAdmin, admin];

};