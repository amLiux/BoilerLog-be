import React, { useState } from 'react'

export const SelectReport = ({handleState}) => {

    const reportes = ['Cantidad de citas', 'Pacientes nuevos', 'Detalle de citas mensual']
    const [dropdownActive, setDropdownActive] = useState(false)
    const [placeholder, setPlaceholder] = useState('Seleccione un reporte')


    const handleOptionClick = (reporte) => {
        setDropdownActive(!dropdownActive)
        setPlaceholder(reporte)
        handleState(reporte)
    }

    const handleDropdownClick = () => {
        setDropdownActive(!dropdownActive)
        handleState('')
    }

    return (
        <div style={{width:'85%'}} className="select__box">
            <div className={`select__box__placeholder ${dropdownActive && 'active'}`}>
                {placeholder}
                <i onClick={()=> handleDropdownClick()} className="fas fa-caret-square-down"></i>
            </div>
            <div className={`select__box-options ${dropdownActive && 'active'}`}>
                {
                    reportes.map(
                        (reporte, ind) =>                          
                        (
                            <div key={ind} onClick={()=> handleOptionClick(reporte)} className="select__box-option">
                                <input type="radio" className="select__box-radio" id={reporte} name={reporte}/>
                                <label htmlFor={reporte}>{reporte}</label>
                            </div>
                        )
                        
                    )
                }
            </div>
        </div>   
    )
}
