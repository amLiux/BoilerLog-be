import React from 'react';
import { SpinnerProps } from '../../constants/propTypes';

export const Spinner = ({size}) => {
	return (<div className={`spinner spinner-${size}`}></div>);
};

Spinner.propTypes = SpinnerProps;