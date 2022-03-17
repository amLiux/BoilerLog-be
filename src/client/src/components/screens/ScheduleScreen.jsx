import React, { useEffect } from 'react';
import { Button } from '../ui/Button';
import { RadioButton } from '../ui/RadioButton';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingScheduleContext, startSettingAppointmentSchedule } from '../../actions/schedules';

export const ScheduleScreen = () => {

	const dispatch = useDispatch();

	const { _id } = useParams();

	const { scheduleContext } = useSelector(state => state.schedules);

	useEffect(() => {
		dispatch(startLoadingScheduleContext(_id));
	}, [_id, dispatch]);

	const handleScheduleClick = () => {
		dispatch(startSettingAppointmentSchedule(_id));
		setTimeout(() => {
			window.location.reload();
		}, 1000);
	};


	return (
		<div className="schedule__main">
			<div className="schedule__box-container">
				<h3 className="auth__title mb-5">Hola {scheduleContext.name}!</h3>
				<h3 className="auth__subtitle mb-5">Estos son los espacios disponibles el día {scheduleContext.date}:</h3>
				{
					scheduleContext.schedules.map(schedule => 
						(
							<RadioButton key={schedule} horario={schedule} label="Hora" />
						)
					)
				}
				<div style={{ display: 'flex', justifyContent: 'space-around', paddingTop: '10px' }}>
					<Button group={true} warning={true} text="Cambiar fecha" />
					<Button onClick={handleScheduleClick} group={true} text="Agendar" />
				</div>
			</div>
		</div>
	);
};
