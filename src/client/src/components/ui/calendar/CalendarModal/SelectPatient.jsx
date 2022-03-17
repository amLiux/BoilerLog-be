import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingPatients } from '../../../../actions/patients';
import { SelectPatientProps } from '../../../../constants/propTypes';

export const SelectPatient = ({ handleState }) => {

	const dispatch = useDispatch();

	const { totalPatients } = useSelector(state => state.patients);
	const [placeholder, setPlaceholder] = useState('Seleccione el paciente');
	const [dropdownActive, setDropdownActive] = useState(false);

	useEffect(() => {
		dispatch(startLoadingPatients());
	}, [dispatch]);

	const handleOptionClick = (paciente) => {
		setDropdownActive(!dropdownActive);
		setPlaceholder(`${paciente.nombre} ${paciente.apellido} - ${paciente.cedula}`);
		handleState(paciente);
	};


	return (
		<div style={{ width: '70%' }} className="select__box">
			<div className={`select__box__placeholder ${dropdownActive && 'active'}`}>
				{placeholder}
				<i onClick={() => setDropdownActive(!dropdownActive)} className="fas fa-caret-square-down"></i>
			</div>
			<div className={`select__box-options ${dropdownActive && 'active'}`}>
				{
					totalPatients.map(
						(paciente) => (
							<div key={paciente._id} onClick={() => handleOptionClick(paciente)} className="select__box-option">
								<input type="radio" className="select__box-radio" id={paciente._id} name={paciente.nombre} />
								<label htmlFor={paciente.nombre}>{`${paciente.nombre} ${paciente.apellido} - ${paciente.cedula}`}</label>
							</div>
						)
					)
				}
			</div>
		</div>
	);
};

SelectPatient.propTypes = SelectPatientProps;