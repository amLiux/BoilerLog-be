import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { CalendarModalProps } from '../../../../constants/propTypes';
import { Toast } from '../../Toast';
import { Banner } from './Banner';
import { NewAppointmentForm } from './NewAppointmentForm';
import { Sidebar } from './Sidebar';
import { AppointmentForm } from './AppointmentForm';

export const CalendarModal = ({ day, isModalOpen, handleClose }) => {
	const { appointments } = day;
	const [empty, setEmpty] = useState();
	const [create, setCreate] = useState(false);

	const { hasActiveAppointment, appointment } = useSelector(state => state.appointments);
	const { toastContext, isToastOpen } = useSelector(state => state.ui);

	useEffect(() =>
		appointments && appointments.length === 0
			? setEmpty(true)
			: setEmpty(false) && setCreate(false)
	, [appointments]);

	const handleCreateScreen = () => setCreate(!create);

	return (
		<div className={`modal-background ${isModalOpen ? 'modal-showing' : ''}`}>
			{isToastOpen && <Toast msg={toastContext.msg} success={toastContext.success} />}
			<div className="modal-inner">
				<Sidebar handleClose={handleClose} />
				<div className="modal-form">
					{
						!empty
							? hasActiveAppointment
								? <AppointmentForm appointment={appointment} />
								: create
									? <NewAppointmentForm callback={handleCreateScreen} />
									: <Banner handleCreateScreen={handleCreateScreen} simpleBanner />
							:
							<>
								{
									create
										? <NewAppointmentForm callback={handleCreateScreen} />
										: <Banner handleCreateScreen={handleCreateScreen} />
								}
							</>
					}
				</div>
			</div>
		</div>
	);
};

CalendarModal.propTypes = CalendarModalProps;
