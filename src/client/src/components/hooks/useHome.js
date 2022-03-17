import { useState, useEffect } from 'react';

export const useHome = (totalAppointments) => {

	const filterAppointments = (state, appointments, firstDayOfWeek, lastDayOfWeek, extraValidation = false) => {
		return appointments.filter(appointment =>
			new Date(appointment.fechaDeseada) >= firstDayOfWeek &&
			new Date(appointment.fechaDeseada) <= lastDayOfWeek &&
			appointment.estado === state && (extraValidation ? appointment : true)
		);
	};

	const [unconfirmedAppointments, setUnconfirmedAppointments] = useState({
		heading: 'Citas sin confirmar',
		time: 'esta semana',
		text: 'Abajo vas a encontrar los pacientes que crearon una cita en la página web, pero no han confirmado el horario, puedes ir al módulo de Pacientes y contactar al paciente para confirmar su cita.',
		appointments: []
	});

	const [appointmentsThisWeek, setAppointmentsThisWeek] = useState({
		heading: 'Citas agendadas',
		time: 'esta semana',
		text: 'Abajo puedes encontrar la fecha y el paciente de las citas actualmente agendadas. Si ves un botón de completar quiere decir que la fecha hábil de esta cita ya pasó, complétala.',
		appointments: []
	});


	const [canceledAppointments, setCanceledAppointments] = useState({
		heading: 'Citas canceladas',
		time: 'esta semana',
		text: 'Abajo vas a encontrar las citas que fueron canceladas esta semana, puedes contactar al paciente y/o doctor para reagendar de ser necesario.',
		appointments: []
	});

	useEffect(() => {
		const todayObj = new Date();
		const todayDate = todayObj.getDate();
		const todayDay = todayObj.getDay();

		const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay + 1));
		const lastDayOfWeek = new Date(firstDayOfWeek);
		lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 5);

		setUnconfirmedAppointments((state) => ({
			...state,
			appointments: filterAppointments('PENDIENTE', totalAppointments, firstDayOfWeek, lastDayOfWeek)
		}));

		setCanceledAppointments((state) => ({
			...state,
			appointments: filterAppointments('CANCELADA', totalAppointments, firstDayOfWeek, lastDayOfWeek)
		}));

		setAppointmentsThisWeek((state) => ({
			...state,
			appointments: filterAppointments('AGENDADA', totalAppointments, firstDayOfWeek, lastDayOfWeek, true)
		}));

	}, [totalAppointments]);

	return [canceledAppointments, appointmentsThisWeek, unconfirmedAppointments];

};