import React from 'react';
import { useDispatch } from 'react-redux';
import { removeActiveAppointment } from '../../../../actions/appointments';
import { clearPatients, setActivePatient } from '../../../../actions/patients';
import { openModal, closeModal } from '../../../../actions/ui';
import { NotPatientFormProps } from '../../../../constants/propTypes';
import { Button } from '../../Button';
import { Form } from '../../Form';

export const NotPatientForm = ({ handleInputChange, errors, values, handleReset, handleSubmit }) => {
	const dispatch = useDispatch();

	const handleAddPacienteClick = () => {
		// se desactiva el modal calendario
		dispatch(closeModal());
		// se remueve la cita para evitar bugs
		dispatch(removeActiveAppointment());
		dispatch(clearPatients());
		delete values.estado;
		delete values._id;
		values.cedula = '';
		// setteamos un paciente para que cuando se abra el modal ya tenga los valores que tenemos hasta el momento en él
		dispatch(setActivePatient({ ...values }));
		dispatch(openModal('PACIENTES'));
	};

	return (
		<>
			<div className="edit-form__form-container-title">
				<h2><i className="fas fa-edit"></i>Editar cita:</h2>
			</div>
			<div className="edit-form__form">
				<Form values={values} handleInputChange={handleInputChange} errors={errors} />
			</div>
			<div style={{ width: '80%' }} className="edit-form__action-bar-group">
				<Button onClick={e => handleReset(e)} warning={true} text={'Cancelar cambios'} group={true} />
				<Button onClick={handleSubmit} text="Guardar" group={true} />
			</div>
			<span onClick={e => handleAddPacienteClick(e)} className="link link-err mb-5">
				Este cliente todavía no es un paciente, click aquí para agregarlo.
			</span>
		</>
	);
};

NotPatientForm.propTypes = NotPatientFormProps;