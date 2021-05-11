import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setCitaActiva } from '../../../actions/citas'
import { RadioButton } from '../RadioButton'

export const Sidebar = ({handleClose}) => {

    const {diaActivo} = useSelector(state => state.ui)

    const {date, citas} = diaActivo



    const dispatch = useDispatch()

    const handleCitaChange = (cita) => {
        dispatch(setCitaActiva(cita))
    }
    
    return (
        <aside className="sidebar">
            <div onClick={handleClose} className="sidebar__navbar">
                <h1><i className="far fa-window-close"></i></h1>
                <div className="sidebar__title">
                    <p>Citas para el <span className="sidebar__title-date">{date}</span></p>
                </div>
            </div>

            <div className="sidebar__citas mt-5">
                {
                    citas?.map(cita => 
                        <RadioButton estado={cita.estado} date={cita.fechaDeseada} onChange={() => handleCitaChange(cita)} key={cita._id} id={cita._id} label={cita.nombre}/>
                    )
                }
            </div>

        </aside>
    )
}
