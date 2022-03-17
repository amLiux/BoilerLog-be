import React from 'react';
import { Button } from '../Button';
import { CalendarHeaderProps } from '../../../constants/propTypes';

export const CalendarHeader = ({ dateDisplay, onNext, onBack }) => {
	return (
		<div className="calendar__header">
			<Button onClick={onBack} group={true} text={<i className="fas fa-arrow-left"></i>} />
			<div className="mb-5">{dateDisplay}</div>
			<Button onClick={onNext} group={true} text={<i className="fas fa-arrow-right"></i>} />
		</div>
	);
};

CalendarHeader.propTypes = CalendarHeaderProps;
