import React, { useState, useEffect } from 'react';
import { useCalendar } from '../hooks/useCalendar';
import { CalendarHeader } from '../ui/calendar/CalendarHeader';
import { Day } from '../ui/calendar/Day';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveDay, openModal } from '../../actions/ui';
import { startLoadingAppointments } from '../../actions/appointments';

export const CalendarScreen = () => {

	const dispatch = useDispatch();

	const [nav, setNav] = useState(0);

	const { totalAppointments } = useSelector(state => state.appointments);

	const [dias, dateDisplay] = useCalendar(totalAppointments, nav);

	useEffect(() => dispatch(startLoadingAppointments()), [dispatch]);

	const handleDiaClick = (day) => {
		if (day.value !== 'padding') {
			dispatch(openModal('CALENDARIO'));
			dispatch(setActiveDay(day));
		}
	};

	// TODO maybe create a localization file to add multilanguage support
	const weekDays = [
		{ fullDay: 'Domingo', letter: 'D' },
		{ fullDay: 'Lunes', letter: 'L' },
		{ fullDay: 'Martes', letter: 'K' },
		{ fullDay: 'Miercoles', letter: 'M' },
		{ fullDay: 'Jueves', letter: 'J' },
		{ fullDay: 'Viernes', letter: 'V' },
		{ fullDay: 'Sabado', letter: 'S' },
	];

	return (
		<div className="main-container">
			<CalendarHeader onNext={() => setNav(nav + 1)} onBack={() => setNav(nav - 1)} dateDisplay={dateDisplay} />
			<div className="calendar__weekdays">
				{
					weekDays.map(({ fullDay, letter }) =>
						<div key={letter}>
							<span className="fullday">{fullDay}</span>
							<span className="firstLetter">{letter}</span>
						</div>
					)
				}
			</div>
			<div className="calendar__content">
				{ dias.map((dia, i) => <Day key={i} day={dia}onClick={() => handleDiaClick(dia)} />) }
			</div>
		</div>
	);
};
