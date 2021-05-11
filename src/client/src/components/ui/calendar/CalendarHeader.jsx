import React from 'react'
import { Button } from '../Button'

export const CalendarHeader = ({dateDisplay, onNext, onBack}) => {
    return (
        <div className="calendar__header">
            <Button clickable={true} onClick={onBack} group={true} text={<i className="fas fa-arrow-left"></i>}/>
            <div className="mb-5">{dateDisplay}</div>
            <Button clickable={true} onClick={onNext} group={true} text={<i className="fas fa-arrow-right"></i>}/>
        </div>
    )
}
