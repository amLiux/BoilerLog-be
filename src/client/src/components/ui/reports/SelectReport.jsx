import React, { useState } from 'react';
import { SelectReportProps } from '../../../constants/propTypes';
import { availableReports } from '../../../constants/reportsTemaplates';

export const SelectReport = ({ handleState }) => {

	const [dropdownActive, setDropdownActive] = useState(false);
	const [placeholder, setPlaceholder] = useState('Seleccione un reporte');


	const handleOptionClick = (reporte) => {
		setPlaceholder(reporte.name);
		setDropdownActive(!dropdownActive);
		handleState(reporte);
	};

	const handleDropdownClick = () => {
		setDropdownActive(!dropdownActive);
		handleState({
			name: '',
			requiredInputs: [],
			renderable: false,
			type: ''
		});
	};

	return (
		<div style={{ width: '85%' }} className="select__box">
			<div className={`select__box__placeholder ${dropdownActive && 'active'}`}>
				{placeholder}
				<i onClick={() => handleDropdownClick()} className="fas fa-caret-square-down"></i>
			</div>
			<div className={`select__box-options ${dropdownActive && 'active'}`}>
				{
					Object.keys(availableReports).map(
						(report) => {
							const { name } = availableReports[report];
							return (
								<div
									key={report}
									onClick={() => handleOptionClick(availableReports[report])}
									className="select__box-option"
								>
									<input
										type="radio"
										className="select__box-radio"
										id={report}
										name={report}
									/>
									<label htmlFor={name}>{name}</label>
								</div>
							);
						}

					)
				}
			</div>
		</div>
	);
};

SelectReport.propTypes = SelectReportProps;