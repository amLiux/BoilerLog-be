import React from 'react';
import { useDispatch } from 'react-redux';
import { setActivePatient } from '../../../actions/patients';
import { PatientsListProps } from '../../../constants/propTypes';

export const PatientsList = ({patients, style}) => {

	const dispatch = useDispatch();

	const handlePacienteClick = (paciente) => {
		dispatch(setActivePatient(paciente));
	};
	
	return (
		<div style={style} className="list">
			<ul>
				{
					patients.map( 
						paciente =>  (
							<li key={paciente._id} onClick={()=> handlePacienteClick(paciente)} >
								<span>{paciente.nombre} {paciente.apellido}</span>
							</li>
						)
					)
				}
			</ul>
		</div>
	);
};

PatientsList.propTypes = PatientsListProps;
