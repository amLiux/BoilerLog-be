import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button } from '../../Button';
import { SelectSchedule } from './SelectSchedule';
import { SelectPatient } from './SelectPatient';
import { startAddingAppointment } from '../../../../actions/appointments';
import { sendToast } from '../../../../actions/ui';
import { NewAppointmentFormProps } from '../../../../constants/propTypes';

export const NewAppointmentForm = ({ callback }) => {
	const dispatch = useDispatch();

	const [schedule, setSchedule] = useState('');
	const [patient, setPatient] = useState({});

	const handleSaveClick = () => {
		const scheduleExists = schedule !== '';
		const patientExists = (Object.keys(patient).length !== 0 && patient.constructor === Object);

		(scheduleExists && patientExists)
			? dispatch(startAddingAppointment(patient, schedule))
			: dispatch(sendToast('Necesitas llenar los 2 valores', false));

		callback();
	};

	return (
		<div className="edit-form__box-container create">
			<div className="edit-form__action-bar">
			</div>
			<form className="edit-form__form-container">
				<div className="edit-form__form-container-title">
					<h2><i className="fas fa-edit"></i>Crear cita:</h2>
				</div>
				<SelectPatient handleState={setPatient} />
				<SelectSchedule handleState={setSchedule} />
				<div className="edit-form__action-bar-group">
					<Button onClick={(e) => handleSaveClick(e)} text="Guardar" />
				</div>
			</form>
		</div>
	);
};

NewAppointmentForm.propTypes = NewAppointmentFormProps;
