import React from 'react';
import { DayProps } from '../../../constants/propTypes';

export const Day = ({ day, onClick }) => {

	const config = JSON.parse(localStorage.getItem('config')) || {
		citasCanceladasEnCalendario: false,
		citasCompletadasEnCalendario: false,
	};

	return (
		<div onClick={onClick} className={`calendar__day ${day?.isToday ? 'calendar__day-active' : ''}`}>
			<span>{day.value !== 'padding' && day.value}</span>
			<div className="calendar__day-group">
				{day.appointments?.length > 0 &&
					day.appointments.map(({ estado }, i) =>
						!((!config.citasCanceladasEnCalendario && estado === 'CANCELADA') || (!config.citasCompletadasEnCalendario && estado === 'COMPLETADA')) && <div className={`calendar__day-event ${estado === 'PENDIENTE' ? 'pending' : estado === 'CANCELADA' ? 'canceled' : estado === 'COMPLETADA' ? 'complete' : ''}`} key={i} ></div>
					)
				}
			</div>
		</div>
	);
};

Day.propTypes = DayProps;