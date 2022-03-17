import React from 'react';
import { useSelector } from 'react-redux';
import { PatientsModalProps } from '../../../constants/propTypes';
import { Toast } from '../Toast';
import { PatientsForm } from './PatientsForm';

export const PatientsModal = ({ isModalOpen, handleClose }) => {

	const { toastContext, isToastOpen } = useSelector(state => state.ui);

	return (
		<div className={`modal-background ${isModalOpen ? 'modal-showing' : ''}`}>
			{isToastOpen && <Toast msg={toastContext.msg} success={toastContext.success} />}
			<div className="modal-inner d-flex">
				<div className="modal-form">
					<PatientsForm handleClose={handleClose} />
				</div>
			</div>
		</div>
	);
};

PatientsModal.propTypes = PatientsModalProps;
