import React from 'react';

import { useDispatch } from 'react-redux';
import { removeToast } from '../../actions/ui';
import { ToastProps } from '../../constants/propTypes';

export const Toast = ({ msg, success }) => {

	const dispatch = useDispatch();

	return (
		<div className="wrapper">
			<div className={`toast ${success && 'toast-success'}`}>
				<div className="content">
					<div className={`icon ${success && 'icon-success'}`} >
						{success
							? <i className="fas fa-check"></i>
							: <i className="fas fa-exclamation"></i>
						}
					</div>
					<div className="details">
						<span>{success ? 'Completado!' : 'Error!'}</span>
						<p>{msg}</p>
					</div>
				</div>
				<div onClick={() => dispatch(removeToast())} className="close-icon"><i className="fas fa-times"></i></div>
			</div>
		</div>

	);
};

Toast.propTypes = ToastProps;
