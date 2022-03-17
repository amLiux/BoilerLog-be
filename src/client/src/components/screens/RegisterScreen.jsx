import React from 'react';
import { Button } from '../ui/Button';
import { Checkbox } from '../ui/Checkbox';
import PropTypes from 'prop-types';
import { Form } from '../ui/Form';
import { useRegister } from '../hooks/useRegister';

export const RegisterScreen = ({ isEdit = false }) => {

	const [values, errors, handleInputChange, handleSubmit, setAdmin, admin] = useRegister();

	return (
		<>
			<h3 className="auth__title mb-5">{isEdit ? 'Editar' : 'Crea una cuenta'}
				<i className="fas fa-user-plus"></i>
			</h3>
			<form onSubmit={handleSubmit}>
				<Form 
					values={values} 
					handleInputChange={handleInputChange} 
					errors={errors} 
					isAuthForm 
				/>
				<Checkbox 
					setting="Administrador?" 
					checked={setAdmin} 
					handleCheck={() => setAdmin(!admin)} 
				/>
				<Button text="Crear" />
			</form>
		</>
	);
};

RegisterScreen.propTypes = {
	isEdit: PropTypes.bool,
};
