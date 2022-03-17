import React, { useEffect, useState } from 'react';
import { capitalizeFistLetter } from '../../services/capitalizeFirstLetter';
import { InputGroup } from './InputGroup';
import { Input } from './Input';
import { FormProps } from '../../constants/propTypes';

export const Form = ({ values, handleInputChange, errors, isAuthForm }) => {
	const [formValues, setFormValues] = useState([]);

	const differentTypeEnum = {
		email: 'email',
		pwd: 'password',
		confPwd: 'password'
	};

	const placeholderEnum = {
		email: 'E-mail',
		user: 'Usuario',
		name: 'Nombre',
		lastName: 'Apellido',
		pwd: 'Contraseña',
		confPwd: 'Confirmar contraseña',
	};

	useEffect(() => {
		const notRendarableProps = ['_id', 'estado', 'fechaDeseada', 'fechaCreada', '__v', 'fechaCreado'];

		const newFormValues = Object.keys(values);
		const renderableProps = newFormValues.filter((formValue) => !notRendarableProps.includes(formValue));
		setFormValues(renderableProps);
	}, [values]);


	return (
		<>
			{
				formValues.map((formValue, index) => {
					const value = values[formValue];
					const label = capitalizeFistLetter(formValue).match(/[A-Z][a-z]+|[0-9]+/g).join(' ');
					//TODO do we want to add type to InputGroup later on?
					const type = Object.prototype.hasOwnProperty.call(differentTypeEnum, formValue)
						? differentTypeEnum?.[formValue]
						: 'text';

					return isAuthForm
						? <Input
							key={index}
							isAuthForm
							handleInputChange={handleInputChange}
							placeholder={placeholderEnum[formValue]}
							errors={errors}
							type={type}
							value={value}
							name={formValue}
						/>
						: <InputGroup
							key={index}
							isEdit={formValue !== '' && formValue !== undefined}
							handleInputChange={handleInputChange}
							errors={errors}
							label={label}
							value={value}
							name={formValue}
						/>;
				})
			}
		</>
	);
};

Form.propTypes = FormProps;
