import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { fetchGetHorariosByDate } from '../../../services/fetch';

export const SelectHorario = ({handleState}) => {

    const {date} = useSelector(state => state.ui.diaActivo)

    const [horarios, setHorarios ] = useState([])
    const [dropdownActive, setDropdownActive] = useState(false)
    const [placeholder, setPlaceholder] = useState('Seleccione el horario')

    useEffect(()=>{
        async function fetchHorariosDisponibles() {
            const token = localStorage.getItem('token')
            const response = await fetchGetHorariosByDate(date, token)
            const {horariosDisponibles} = await response.json()
            horariosDisponibles.sort((a,b) => a-b)
            setHorarios(horariosDisponibles)
          }
          fetchHorariosDisponibles();
    }, [date]);


    const handleOptionClick = (horario, stringHorario) => {
        setDropdownActive(!dropdownActive)
        setPlaceholder(stringHorario)
        const date2 = new Date(date)
        date2.setHours(horario)
        handleState(date2)
    }

    // const amOrPm = (hora) => hora < 12 ? 'am' : 'pm'

    const createHorario = (hora) => `${hora}:00 - ${hora+1}:00`

    return (
        <div style={{width:'70%'}} className="select__box">
            <div className={`select__box__placeholder ${dropdownActive && 'active'}`}>
                {placeholder}
                <i onClick={()=> setDropdownActive(!dropdownActive)} className="fas fa-caret-square-down"></i>
            </div>
            <div className={`select__box-options ${dropdownActive && 'active'}`}>
                {
                    horarios.map(
                        (horario) => (
                            <div key={horario} onClick={()=> handleOptionClick(horario, createHorario(horario))} className="select__box-option">
                                <input type="radio" className="select__box-radio" id={horario} name={horario}/>
                                <label htmlFor={horario}>{createHorario(horario)}</label>
                            </div>
                        )
                    )
                }
            </div>
        </div>   
    )
}
