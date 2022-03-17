import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingSchedulesByDate } from '../../../../actions/schedules';
import { SelectScheduleProps } from '../../../../constants/propTypes';

export const SelectSchedule = ({ handleState, hours, setHasChanged }) => {
	const dispatch = useDispatch();
	const { date } = useSelector(state => state.ui.activeDay);

	const { schedules } = useSelector(state => state.schedules);
	const [dropdownActive, setDropdownActive] = useState(false);
	const [placeholder, setPlaceholder] = useState('Seleccione el horario');

	useEffect(() => {
		if(hours !== '') {
			setPlaceholder(createHorario(hours));
			const scheduled = new Date(date);
			scheduled.setHours(hours);
			handleState(scheduled);
		}
		dispatch(startLoadingSchedulesByDate(date));
	}, [date, dispatch, hours, handleState]);


	const handleOptionClick = (horario, stringHorario) => {
		setDropdownActive(!dropdownActive);
		setPlaceholder(stringHorario);
		const date2 = new Date(date);
		date2.setHours(horario);
		setHasChanged(true);
		handleState(date2);
	};

	const createHorario = (hora) => `${hora}:00 - ${hora + 1}:00`;

	return (
		<div style={{ width: '70%' }} className="select__box">
			<div className={`select__box__placeholder ${dropdownActive && 'active'}`}>
				{placeholder}
				<i onClick={() => setDropdownActive(!dropdownActive)} className="fas fa-caret-square-down"></i>
			</div>
			<div className={`select__box-options ${dropdownActive && 'active'}`}>
				{
					schedules.map(
						(horario) => (
							<div key={horario} onClick={() => handleOptionClick(horario, createHorario(horario))} className="select__box-option">
								<input type="radio" className="select__box-radio" id={horario} name={horario} />
								<label htmlFor={horario}>{createHorario(horario)}</label>
							</div>
						)
					)
				}
			</div>
		</div>
	);
};

SelectSchedule.propTypes = SelectScheduleProps;