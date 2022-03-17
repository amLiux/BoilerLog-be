import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingPatients } from '../../actions/patients';
import { openModal } from '../../actions/ui';
import { usePagination } from '../hooks/usePagination';
import { Button } from '../ui/Button';
import { InputGroup } from '../ui/InputGroup';
import { PatientsDashboard } from '../ui/pacientes/PatientsDashboard';
import { PatientsForm } from '../ui/pacientes/PatientsForm';
import { PatientsList } from '../ui/pacientes/PatientsList';
import { Spinner } from '../ui/Spinner';
import { Toast } from '../ui/Toast';

export const PatientsScreen = () => {
	const dispatch = useDispatch();
	const handleAddPacientClick = () => dispatch(openModal('PACIENTES'));

	const { toastContext, isToastOpen, isModalOpen } = useSelector(state => state.ui);
	const { hasActivePacient, activePatient, totalPatients } = useSelector(state => state.patients);
	const [patientId, setPatientId] = useState('');
	const [currentPacientes, currentPage, handleChangePage] = usePagination(totalPatients, 8);
	const firstUpdate = useRef(true);

	const style2 = currentPacientes.length < 8 ? { marginBottom: 'auto' } : {};

	useEffect(() => {
		if (firstUpdate.current) {
			firstUpdate.current = false;
			dispatch(startLoadingPatients());
		}
		if (hasActivePacient) setPatientId(activePatient._id);
	}, [dispatch, hasActivePacient, activePatient]);

	return (
		<>
			{isToastOpen && !isModalOpen && <Toast success={toastContext.success} msg={toastContext.msg} />}
			<div style={{ width: '100%', display: 'flex' }}>
				<div className="secondary-container">
					<div className="main-container__search-group">
						<form action="">
							<InputGroup name="busqueda" search={true} />
						</form>
					</div>
					<PatientsList style={style2} patients={currentPacientes} />
					{
						totalPatients.length > 8 &&
						<div style={{ marginTop: '-3rem' }} className="calendar__header">
							<Button onClick={() => handleChangePage('back')} group={true} text={<i className="fas fa-arrow-left"></i>} />
							<div className="mb-5">{currentPage}</div>
							<Button onClick={() => handleChangePage('next')} group={true} text={<i className="fas fa-arrow-right"></i>} />
						</div>
					}
				</div>
				<div style={{ width: '60%' }} className="main-container">
					{
						hasActivePacient && patientId !== ''
							? <div className="d-flex" style={{ justifyContent: 'flex-start', alignItems: 'center', height: '100%' }} >
								<PatientsForm isEdit={hasActivePacient} />
								<PatientsDashboard patientId={patientId} />
							</div>
							: <div className="d-flex">
								<div className="main-container__banner">
									<div>
										<Spinner size="big" />
										<h1>Escoje un paciente a la izquierda </h1>
									</div>
									<h1>o</h1>
									<div>
										<i onClick={handleAddPacientClick} className="fas fa-user-injured"></i>
										<h1>Crea un paciente.</h1>
									</div>
								</div>
							</div>
					}
				</div>
			</div>
		</>
	);
};
