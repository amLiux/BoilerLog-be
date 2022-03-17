import React from 'react';
import { CheckboxProps } from '../../constants/propTypes';

export const Checkbox = ({handleCheck, setting, helpMessage, checked}) => {
	return (
		<div className="checkbox mb-5 mt-1">
			<h5 className="mb-1" style={{textAlign: 'left', marginTop:'13px', marginRight: 'auto'}}>
				{setting}
				<br/>
				<span style={{fontSize: '2rem', fontWeight:'400'}}>{helpMessage}</span>    
			</h5>
			<input onChange={handleCheck} type="checkbox" defaultChecked={checked} />
		</div>
	);
};

Checkbox.propTypes = CheckboxProps;