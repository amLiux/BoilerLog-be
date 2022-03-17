import React from 'react';
import { TextareaProps } from '../../constants/propTypes';

export const Textarea = ({ name, handleInputChange, value, placeholder, disabled }) => {
	return (
		<textarea disabled={disabled} onChange={handleInputChange} placeholder={placeholder} value={value} className="textarea" name={name} cols="30" rows="10"></textarea>
	);
};

Textarea.propTypes = TextareaProps;
