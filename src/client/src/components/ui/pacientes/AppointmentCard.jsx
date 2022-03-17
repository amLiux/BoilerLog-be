import React from 'react';
import { useDispatch } from 'react-redux';
import { startUpdatingAppointment } from '../../../actions/appointments';
import { AppointmentCardProps } from '../../../constants/propTypes';
import { useCita } from '../../hooks/useCita';
import { Textarea } from '../Textarea';

export const AppointmentCard = ({ appointment }) => {
	const dispatch = useDispatch();
	const handleHookCallback = () => dispatch(startUpdatingAppointment({ ...appointment[0], nota }));


	const [editNote, handleEditClick, nota, handleInputChange, stringEstado, estado, newFecha] =
		useCita(appointment, handleHookCallback);

	return (
		<div className="card-container">
			<div className={`${estado === 'CANCELADA' ? 'cancelada' : estado === 'AGENDADA' ? 'agendada' : estado === 'PENDIENTE' ? 'pendiente' : 'completada'} card-header`}>
				<span> {`${newFecha} |`} </span><h5>{`| ${stringEstado}  `}</h5>
			</div>
			<div className="card-content">
				<Textarea
					disabled={!editNote}
					handleInputChange={handleInputChange}
					placeholder={nota}
					value={nota}
					name="email" />
				<span>{ }</span>
			</div>
			<div className="card-actions">
				<span onClick={handleEditClick} className="link">
					{editNote ? 'Guardar Nota' : 'Editar Nota'}
				</span>
			</div>
		</div>
	);
};

AppointmentCard.propTypes = AppointmentCardProps;
