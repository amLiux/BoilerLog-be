import React from 'react';
import PropTypes from 'prop-types';

export const Button = ({ group, warning = false, success = false, text, onClick, disabled }) => {

	let props;

	if (onClick) {
		props = {
			onClick
		};
	}

	if(disabled) {
		props = {
			...props,
			disabled,
		};
	}

	const className = `btn pointer mt-1 mb-5 ${warning ? 'btn__warning' : 'btn__primary'} ${success ? 'btn__success' : 'btn__primary'} ${group ? 'btn__group' : 'btn__block'}`;

	return (
		<button
			{...props}
			className={className}
			type="submit">
			{text}
		</button>
	);

};

Button.propTypes = {
	group: PropTypes.bool,
	warning: PropTypes.bool, 
	success: PropTypes.bool, 
	text: PropTypes.oneOfType([PropTypes.string, PropTypes.object]), 
	onClick: PropTypes.func,
	disabled: PropTypes.bool,
};