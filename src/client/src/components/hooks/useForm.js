import { useState, useEffect } from 'react';

export const useForm = (initialState = {}, validate, callback) => {

	const [values, setValues] = useState(initialState);
	const [errors, setErrors] = useState({});
	const [isSubmitting, setIsSubmitting] = useState(false);


	useEffect(() => {
		if (Object.keys(errors).length === 0 && isSubmitting) {
			callback();
			setIsSubmitting(false);
		}

	}, [errors, callback, isSubmitting]);

	const handleSubmit = (e) => {
		e && e.preventDefault();
		setErrors(validate(values));
		setIsSubmitting(true);
	};

	const reset = (newState = initialState) => {
		setValues(newState);
	};

	const handleInputChange = ({ target }) => {
		setValues({
			...values,
			[target.name]: target.value
		});
	};

	return [values, handleInputChange, handleSubmit, errors, reset];
};