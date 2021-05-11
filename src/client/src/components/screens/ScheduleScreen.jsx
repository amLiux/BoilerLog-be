import React, { useEffect, useState } from 'react'
import { Button } from '../ui/Button'
import { RadioButton } from '../ui/RadioButton'
import {useParams} from 'react-router-dom'
import { fetchGetHorarios } from '../../services/fetch'
import { useDispatch } from 'react-redux'
import { startUpdateCitaConHorario } from '../../actions/horarios'

export const ScheduleScreen = () => {

    const dispatch = useDispatch()

    const {_id} = useParams()

    const [horarios, setHorarios ] = useState([])
    const [nombre, setNombre] = useState('')
    const [fecha, setFecha] = useState('')

    useEffect(()=>{
        async function fetchHorariosDisponibles() {
            const response = await fetchGetHorarios(_id)
            const {horariosDisponibles, nombre, fecha} = await response.json()
            setHorarios(horariosDisponibles)
            setNombre(nombre)
            setFecha(fecha)
          }
          fetchHorariosDisponibles();
    }, [_id]);

    const handleAgendarClick = () => {
        dispatch(startUpdateCitaConHorario(_id))
        setTimeout(()=>{
            window.location.reload()
        }, 1000)
    }


    return (
        <div className="schedule__main">
            <div className="schedule__box-container">
                <h3 className="auth__title mb-5">Hola {nombre}!</h3>
                <h3 className="auth__subtitle mb-5">Estos son los espacios disponibles el día {fecha}:</h3>
                {
                    horarios.map(horario => (<RadioButton key={horario} horario={horario} label="Hora"/>))
                }
                <div style={{display: 'flex', justifyContent: 'space-around', paddingTop: '10px'}}>
                    <Button group={true} warning={true} text="Cambiar fecha" />
                    <Button clickable={true} onClick={handleAgendarClick} group={true} text="Agendar" />
                </div>
            </div>
        </div>
    )
}
