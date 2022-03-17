import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UpdateAppointmentFormProps } from '../../../../constants/propTypes';
import { Button } from '../../Button';
import { SelectSchedule } from './SelectSchedule';

export const UpdateAppointmentForm = ({ values, setSchedule, handleDelete, handleSubmit, hasChanged, setHasChanged }) => {
	const { nombre, apellido, estado } = values;
	const [hours, setHours] = useState('');

	useEffect(() => {
		if(estado === 'AGENDADA') {
			const scheduledDate = new Date(values.fechaDeseada);
			setHours(scheduledDate.getHours());
		}
	}, [values, estado]);
	
	return (
		<>
			<div className="edit-form__form-container-title">
				<h2><i className="fas fa-user-clock"></i> Editar horario:</h2>
			</div>
			<div className="edit-form__form-container-header">
				<div>
					<h2 style={{ fontSize: '1.6rem' }}>{nombre} {apellido}</h2>
					<Link to="#" className="link link-suc mb-5">Paciente <i className="fas fa-check"></i> </Link>
				</div>
				<span>
					&#8592; Puedes encontrar el horario actual de la cita de {nombre} en la barra de la izquierda o abajo &#8595;.
				</span>
			</div>
			<SelectSchedule hours={hours} setHasChanged={setHasChanged} handleState={setSchedule} />
			<div style={{ width: '80%' }} className="edit-form__action-bar-group">
				<Button onClick={e => handleDelete(e)} warning={true} text={'Cancelar cita'} group={true} />
				<Button disabled={!hasChanged} onClick={handleSubmit} text="Guardar" group={true} />
				{
					estado === 'AGENDADA' &&
					<Button success={true} onClick={handleSubmit} text="Completar cita" group={true} />
				}
			</div>
		</>
	);
};

UpdateAppointmentForm.propTypes = UpdateAppointmentFormProps;