import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Button } from '../Button'
import { SelectHorario } from './SelectHorario'
import { SelectPaciente } from './SelectPacientes'
import {startAddingCita} from '../../../actions/citas'
import { setToastActivo } from '../../../actions/ui'


export const CitaForm = () => {


    const dispatch = useDispatch()

    const [horario, setHorario] = useState('')
    const [paciente, setPaciente] = useState({})

    const handleSaveClick = async (e) => {
        e.preventDefault()
        horario !== '' && 
        Object.keys(paciente).length !== 0 && 
        paciente.constructor === Object ? dispatch(startAddingCita(paciente, horario)) : dispatch(setToastActivo('Necesitas llenar los 2 valores'))
    }

    return (
        <div className="edit-form__box-container create">
            <div className="edit-form__action-bar">
                {/* <div className="edit-form__action-bar-group">
                    <div className="edit-form__action-bar-item">
                        <i className="fab fa-whatsapp"></i>
                    </div>
                    <div className="edit-form__action-bar-item">
                        <i className="far fa-envelope"></i>
                    </div>
                    <div className="edit-form__action-bar-item">
                        <i className="fas fa-phone-alt"></i>
                    </div>
                </div> */}
            </div>
            <form className="edit-form__form-container">
                <div className="edit-form__form-container-title">
                    <h2><i className="fas fa-edit"></i>Crear cita:</h2>
                </div>
                <SelectPaciente handleState={setPaciente} />
                <SelectHorario handleState={setHorario}/>
                <div className="edit-form__action-bar-group">
                    <Button onClick={(e) => handleSaveClick(e)} clickable={true} text="Guardar" />
                </div>
            </form>
        </div>
    )
}
