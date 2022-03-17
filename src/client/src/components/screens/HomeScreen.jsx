import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingAppointments } from '../../actions/appointments';
import { useHome } from '../hooks/useHome';
import { Dashboard } from '../ui/home/Dashboard';

export const HomeScreen = () => {
	const dispatch = useDispatch();
	const { totalAppointments } = useSelector(state => state.appointments);
	const dashboardsInfo = useHome(totalAppointments);

	useEffect(() => dispatch(startLoadingAppointments()), [dispatch]);

	return (
		<div className="main-container main-container-home">
			<h1 style={{ textAlign: 'center', marginTop: '1.5rem', marginBottom: '-3rem', fontWeight: '500', fontSize: '3rem' }}>Información importante: </h1>
			<div className="dashboard-home">
				{
					dashboardsInfo.map(({ heading, time, text, appointments }, ind) =>
						<Dashboard key={ind} appointments={appointments} heading={heading} time={time} text={text} />
					)
				}
			</div>
		</div>
	);
};
