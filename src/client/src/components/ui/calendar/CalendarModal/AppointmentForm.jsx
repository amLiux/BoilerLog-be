import React from 'react';
import { AppointmentFormProps } from '../../../../constants/propTypes';
import { useAppointmentForm } from '../../../hooks/useAppointmentForm';
import { NotPatientForm } from './NotPatientForm';
import { UpdateAppointmentForm } from './UpdateAppointmentForm';

export const AppointmentForm = ({ appointment }) => {
	const [
		isPatient,
		setSchedule,
		handleDelete,
		handleSubmit,
		values,
		handleInputChange,
		errors,
		handleReset,
		hasChanged,
		setHasChanged
	] = useAppointmentForm(appointment);

	return (
		<div className="edit-form__box-container create">
			<div className="edit-form__action-bar">
			</div>
			<form className="edit-form__form-container">
				{
					isPatient
						?
						<UpdateAppointmentForm
							values={values}
							setSchedule={setSchedule}
							handleDelete={handleDelete}
							handleSubmit={handleSubmit}
							hasChanged={hasChanged}
							setHasChanged={setHasChanged}
						/>
						:
						<NotPatientForm
							handleInputChange={handleInputChange}
							errors={errors}
							values={values}
							handleReset={handleReset}
							handleSubmit={handleSubmit}
						/>
				}
			</form>
		</div>
	);
};

AppointmentForm.propTypes = AppointmentFormProps;