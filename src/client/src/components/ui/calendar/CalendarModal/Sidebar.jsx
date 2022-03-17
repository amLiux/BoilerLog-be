import React, { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setActiveAppointment } from '../../../../actions/appointments';
import { SidebarProps } from '../../../../constants/propTypes';
import { RadioButton } from '../../RadioButton';

export const Sidebar = ({ handleClose }) => {

	const { activeDay } = useSelector(state => state.ui);

	const { date, appointments } = activeDay;

	const dispatch = useDispatch();

	let appointmentRef = useRef({});

	const handleAppointmentChange = (appointment) => {
		if (appointmentRef.current !== appointment) {
			dispatch(setActiveAppointment(appointment));
			appointmentRef.current = appointment;
		}
	};

	return (
		<aside className="sidebar">
			<div onClick={handleClose} className="sidebar__navbar">
				<h1><i className="far fa-window-close"></i></h1>
				<div className="sidebar__title">
					<p>Citas para el <span className="sidebar__title-date">{date}</span></p>
				</div>
			</div>

			<div className="sidebar__citas mt-5">
				{
					appointments?.map(cita =>
						<RadioButton sidebarBtn estado={cita.estado} date={cita.fechaDeseada} onChange={() => handleAppointmentChange(cita)} key={cita._id} id={cita._id} label={cita.nombre} />
					)
				}
			</div>

		</aside>
	);
};

Sidebar.propTypes = SidebarProps;
