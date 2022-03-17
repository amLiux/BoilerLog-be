import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import { CalendarModal } from '../components/ui/calendar/CalendarModal/CalendarModal';
import { Navbar } from '../components/ui/Navbar';
import { closeModal, removeActiveDay, removeToast } from '../actions/ui';
import { removeActiveAppointment } from '../actions/appointments';
import { PatientsModal } from '../components/ui/pacientes/PatientsModal';
import { removeActivePatient } from '../actions/patients';
import { 
	ReportsScreen, 
	UserManagementScreen, 
	CalendarScreen, 
	AppointmentsScreen, 
	ConfigScreen,
	HomeScreen,
	PatientsScreen
} from '../components/screens';
import { Toast } from '../components/ui/Toast';


export const DashboardRoutes = () => {

	const { isModalOpen, activeDay, modalType } = useSelector(state => state.ui);

	const dispatch = useDispatch();

	const { toastContext, isToastOpen } = useSelector(state => state.ui);

	const handleCloseCalendar = () => {
		dispatch(closeModal());
		dispatch(removeActiveDay());
		dispatch(removeActiveAppointment());
		dispatch(removeToast());
	};

	const handleClosePacientes = () => {
		dispatch(closeModal());
		dispatch(removeActivePatient());
		dispatch(removeToast());
	};

	return (
		<div className="main">
			<Navbar />
			{isModalOpen && Object.keys(activeDay).length !== 0 && modalType === 'CALENDARIO' && <CalendarModal day={activeDay} handleClose={() => handleCloseCalendar()} isModalOpen={isModalOpen} />}
			{isModalOpen && modalType === 'PACIENTES' && <PatientsModal handleClose={() => handleClosePacientes()} isModalOpen={isModalOpen} />}
			<div className="main__main-content">
				{isToastOpen && <Toast success={toastContext.success} msg={toastContext.msg} />}
				<Switch>
					<Route exact path="/dentaltask/" component={HomeScreen} />
					<Route exact path="/dentaltask/calendario" component={CalendarScreen} />
					<Route exact path="/dentaltask/citas" component={AppointmentsScreen} />
					<Route exact path="/dentaltask/pacientes" component={PatientsScreen} />
					<Route exact path="/dentaltask/reportes" component={ReportsScreen} />\
					<Route exact path="/dentaltask/usuarios" component={UserManagementScreen} />
					<Route exact path="/dentaltask/configuracion" component={ConfigScreen} />
				</Switch>
			</div>
		</div>
	);
};
