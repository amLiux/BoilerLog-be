import { useState, useEffect } from 'react';
import { capitalizeFistLetter } from '../../services/capitalizeFirstLetter';

export const useCalendar = (appointments, nav) => {

	const [dateDisplay, setDateDisplay] = useState('');
	const [days, setDays] = useState([]);

	useEffect(() => {
		const appointmentsPerDay = (day) =>
			appointments.filter(appointment => new Date(appointment.fechaDeseada).toDateString() === new Date(day).toDateString() && appointment);

		const week = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];

		const date = new Date();
		nav !== 0 && date.setMonth(new Date().getMonth() + nav);

		const
			dia = date.getDate(),
			mes = date.getMonth(),
			anho = date.getFullYear();

		const primerDiaDelMes = new Date(anho, mes, 1);
		const diasEnMes = new Date(anho, mes + 1, 0).getDate();
		const dateString = primerDiaDelMes.toLocaleDateString('es-us', {
			weekday: 'long',
			year: 'numeric',
			month: 'numeric',
			day: 'numeric'
		});


		const nombreDelPrimerDia = capitalizeFistLetter(dateString.split(', ')[0]);
		const diasComodinInicio = week.indexOf(nombreDelPrimerDia);

		setDateDisplay(`${capitalizeFistLetter(date.toLocaleDateString('es', { month: 'long' }))}`);

		const daysArr = [];

		for (let i = 1; i <= diasComodinInicio + diasEnMes; i++) {
			const diaActual = `${mes + 1}/${i - diasComodinInicio}/${anho}`;
			if (i > diasComodinInicio) {
				daysArr.push({
					value: i - diasComodinInicio,
					appointments: appointmentsPerDay(diaActual),
					isToday: diaActual.split('/')[1] === dia.toString() && nav === 0 ? true : false,
					date: diaActual
				});
			} else {
				daysArr.push({
					value: 'padding',
					appointments: null,
					isToday: false,
					date: ''
				});
			}
		}


		const paddingDaysToAppend = 7 - daysArr.length % 7;

		for (let i = paddingDaysToAppend; i >= 1 && i !== 7; i--) {
			daysArr.push({
				value: 'padding',
				appointments: null,
				isToday: false,
				date: ''
			});
		}

		setDays(daysArr);

	}, [appointments, nav]);

	return [days, dateDisplay];

};