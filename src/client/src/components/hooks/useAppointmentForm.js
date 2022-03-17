import { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { setActiveAppointment, startCancelingAppointment, startUpdatingAppointment } from '../../actions/appointments';
import { areCitaInputsValid } from '../controllers/citas.controller';
import { useForm } from './useForm';

export const useAppointmentForm = (appointment) => {
	const dispatch = useDispatch();

	const [isPatient, setIsPatient] = useState(true);
	const [schedule, setSchedule] = useState('');
	const [hasChanged, setHasChanged] = useState(false);
	const appointmentBeforeChanges = useRef(appointment);

	const handleUpdate = () => {
		let updatedAppointment;
		// si existe un horario quiere decir que ya existe un paciente y lo único que podemos actualizar es dicho horario o completar la cita

		if (schedule !== '') {
			const appointmentState = `${appointment.estado}_${String(hasChanged).toUpperCase()}`;

			switch (appointmentState) {
				case 'PENDIENTE_TRUE': {
					updatedAppointment = { ...appointment, estado: 'AGENDADA', fechaDeseada: new Date(schedule).toISOString() };
					break;
				}
				case 'AGENDADA_FALSE': {
					updatedAppointment = { ...appointment, estado: 'COMPLETADA' };
					break;
				}
				case 'AGENDADA_TRUE': {
					updatedAppointment = { ...appointment, estado: 'AGENDADA', fechaDeseada: new Date(schedule).toISOString() };
					break;
				}
				default: {
					updatedAppointment = { ...appointment, fechaDeseada: new Date(schedule).toISOString() };
					break;
				}
			}

		} else {
			// sino podemos actualizar literalmente cualquier valor que esté en nuestro cliente (que todavía no es paciente)
			updatedAppointment = values;
		}

		dispatch(startUpdatingAppointment(updatedAppointment));
	};

	const handleReset = (e) => {
		e.preventDefault();
		if (appointmentBeforeChanges !== appointment) {
			reset({ ...appointmentBeforeChanges.current });
		}
	};

	const handleDelete = (e) => {
		e.preventDefault();
		dispatch(startCancelingAppointment(appointment));
	};

	const [values, handleInputChange, handleSubmit, errors, reset] = useForm({ ...appointment }, areCitaInputsValid, handleUpdate);

	useEffect(() => {
		dispatch(setActiveAppointment(values));
	}, [values, dispatch]);

	useEffect(() => {
		//TODO check why this one is double rendering
		setIsPatient(Object.prototype.hasOwnProperty.call(appointment, 'idPaciente'));
		if (appointmentBeforeChanges.current._id !== appointment._id) {
			appointmentBeforeChanges.current = appointment;
			reset({ ...appointment });
		}
	}, [reset, appointment]);

	return [isPatient, setSchedule, handleDelete, handleSubmit, values, handleInputChange, errors, handleReset, hasChanged, setHasChanged];
};