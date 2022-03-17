import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingPatientAppointments } from '../../../actions/patients';
import { CardSliderProps } from '../../../constants/propTypes';
import { usePagination } from '../../hooks/usePagination';
import { AppointmentCard } from './AppointmentCard';

export const CardSlider = ({ patientId }) => {
	const dispatch = useDispatch();
	const { patientAppointments } = useSelector(state => state.patients);

	const [currentCita, currentPage, handleChangePage, maxPage] = usePagination(patientAppointments, 1);

	useEffect(() => {
		dispatch(startLoadingPatientAppointments(patientId));
	}, [patientId, dispatch]);

	return (
		<>
			{patientAppointments.length <= 0 ?
				<>
					<i className="fas fa-info-circle"><span> No hay citas para este paciente </span></i>
				</>
				:
				<>
					{
						patientAppointments.length !== 1 && currentPage !== 1 && <i onClick={() => handleChangePage('back')} className="fas fa-arrow-left"></i>
					}

					<AppointmentCard appointment={currentCita} />

					{
						patientAppointments.length !== 1 && currentPage !== maxPage && <i onClick={() => handleChangePage('next')} className="fas fa-arrow-right"></i>
					}
				</>
			}
		</>
	);
};

CardSlider.propTypes = CardSliderProps;
