import React from 'react';
import { InputProps } from '../../constants/propTypes';
import { ErrorHelp } from './ErrorHelp';

export const Input = ({ type, handleInputChange, errors = {}, value, name, placeholder, onKeyDown, isAuthForm = false }) => {
	const hasError = errors[name];

	return (
		<>
			<input
				className={`auth__input ${ hasError ? 'auth__input-hasError' : ''} mb-5`}
				name={name}
				autoComplete="off"
				type={type}
				placeholder={placeholder}
				value={value}
				onKeyDown={onKeyDown}
				onChange={handleInputChange}
			/>
			{ hasError && <ErrorHelp isAuth={isAuthForm} message={hasError} /> }
		</>
	);
};

Input.propTypes = InputProps;