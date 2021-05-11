import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSelectedHorario } from '../../actions/horarios'

export const RadioButton = ({estado, date, horario, label, onChange}) => {

    const dispatch = useDispatch()
    const [canceled, setCanceled] = useState(false)
    // const amOrPm = (hora) => hora < 12 ? 'am' : 'pm'

    if(date && new Date(date).getHours() !== 0 && !canceled ){
        const hour = new Date(date).getHours()
        // const sufix = amOrPm(hour)
        date = `${hour}:00 - ${hour + 1}:00`
    }

    useEffect(()=>{
        estado === 'CANCELADA' && setCanceled(true)
    }, [estado])

    const estadoString = (estado) => {
        switch (estado) {
            case 'CANCELADA':
                return 'Cancelada'

            case 'PENDIENTE':
                return 'Pendiente'

            default:
                break;
        }
    }
    
    return (
        <div className="radio-button mb-5">
            {
                onChange 
                    ? <input disabled={canceled}className={`${!horario && new Date(date).getHours() === 0 ? 'error' : ''}`} value={horario} onChange={onChange} type="radio" name="card" />
                    : <input value={horario} onChange={e => dispatch(setSelectedHorario(e))} type="radio" name="card" />
            }
            <label className="radio-button__label" htmlFor="card">
                <h5 className={`radio-button__label-heading ${canceled ? 'canceled' : ''}`}>{label}:</h5>
                <h6 className={`radio-button__label-subheading ${!horario && new Date(date).getHours() === 0 ? 'error' : canceled ? 'canceled' : ''}`  }>
                    {
                        date && new Date(date).getHours() !== 0 && estado !== 'CANCELADA'
                            ? date 
                            : horario 
                                ? `${horario}:00 - ${horario+1}:00` 
                                : estadoString(estado)
                    }
                </h6>
            </label>
        </div>
    )
}
