import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { removeCitaActiva, setCitaActiva, startCancelingCita, startUpdateCita } from '../../../actions/citas'
import { clearPacientes, setPacienteActivo } from '../../../actions/pacientes'
import { setModalActivo, setModalInactivo } from '../../../actions/ui'
import { areCitaInputsValid } from '../../controllers/citas.controller'
import { useForm } from '../../hooks/useForm'
import { Button } from '../Button'
import { ErrorHelp } from '../ErrorHelp'
import { InputGroup } from '../InputGroup'
import { SelectHorario } from './SelectHorario'

export const EditCita = ({isEdit}) => {

    const dispatch = useDispatch()


    const handleAddPacienteClick = () => {
        dispatch(setModalInactivo())
        dispatch(removeCitaActiva())
        dispatch(clearPacientes())
        delete values.estado 
        delete values._id 
        dispatch(setPacienteActivo({...values}))
        dispatch(setModalActivo('PACIENTES'))
         
    }
    const [isPaciente, setIsPaciente] = useState(true)

    const [horario, setHorario] = useState('')
    
    const handleUpdate = () => {
        if (horario !== '') {
            const update = cita.estado === "PENDIENTE" 
                ? 
                    {...cita, estado: "AGENDADA", fechaDeseada: new Date(horario).toISOString()}
                :
                    {...cita, fechaDeseada: new Date(horario).toISOString()}
            dispatch(startUpdateCita(update))
        }else{
            dispatch(startUpdateCita(values))
        }
    } 

    const {cita} = useSelector(state => state.citas)
    const citaAntesDeCambios = useRef(cita)

    const handleReset = (e) => {
        e.preventDefault()
        if(citaAntesDeCambios !== cita)
            reset({...citaAntesDeCambios.current})
    }

    const handleDelete = (e) => {
        e.preventDefault()
        dispatch(startCancelingCita(cita))
    }
    
    const [values, handleInputChange, handleSubmit, errors, reset] = useForm(
        {...cita}, 
        areCitaInputsValid, handleUpdate)
        
    let {nombre, apellido, email, numeroTelefonico } = values
    
    const activeCita = useRef(cita._id)

    useEffect(()=> {
        setIsPaciente(cita.hasOwnProperty('idPaciente'))
        if(activeCita.current !== cita._id){
            citaAntesDeCambios.current = cita
            reset({...cita})
            activeCita.current = cita._id
        }

    }, [cita, reset])

    useEffect(()=>{
        dispatch(setCitaActiva(values))
    }, [values, dispatch])
    
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
                    <h2>
                        {isPaciente 
                            ? <><i className="fas fa-user-clock"></i> Editar horario:</>  
                            : <><i className="fas fa-edit"></i>Editar cita:</>
                        }
                    </h2>
                </div>
                {isPaciente 
                    ? <> 
                        <div style={{display: 'flex', width: '70%', justifyContent:'space-between'}}>
                            <h2>{nombre} {apellido}</h2>
                            <Link to="#" className="link link-suc mb-5">Paciente <i className="fas fa-check"></i> </Link>
                        </div>
                        <span style={{paddingLeft:'6px', textAlign: 'left', width: '70%', marginBottom: '-10px', fontSize: '9.5px', fontWeight: '500'}}> &#8592; Puedes encontrar el horario actual de la cita de {nombre} en la barra de la izquierda. </span>
                        <SelectHorario handleState={setHorario}/>


                      </> 
                    : <> 
                        <InputGroup 
                            isEdit={isEdit}
                            name="nombre"
                            label="Nombre"
                            handleInputChange={handleInputChange} 
                            value={nombre} />
                            {
                                errors.nombre && (<ErrorHelp message={errors.nombre} />)
                            }
                
                        <InputGroup 
                            isEdit={isEdit}
                            name="apellido" 
                            label="Apellido"
                            handleInputChange={handleInputChange} 
                            value={apellido}/>
                            {
                                errors.apellido && (<ErrorHelp message={errors.apellido} />)
                            }

                        <InputGroup
                            isEdit={isEdit}
                            name="email" 
                            handleInputChange={handleInputChange} 
                            value={email} 
                            label="Email"/>
                            {
                                errors.email && (<ErrorHelp message={errors.email} />)
                            }
                        <InputGroup 
                            isEdit={isEdit}
                            name="numeroTelefonico"
                            handleInputChange={handleInputChange} 
                            value={numeroTelefonico} 
                            label="Número telefónico"/>
                            {
                                errors.numeroTelefonico && (<ErrorHelp message={errors.numeroTelefonico} />)
                            }
                      </>                      
                }    
                <div style={{width: '70%'}} className="edit-form__action-bar-group">
                    <Button onClick={ isPaciente ? e => handleDelete(e) : e => handleReset(e) } clickable={true} warning="true" text={isPaciente ? 'Cancelar cita' : 'Cancelar cambios'} group={true}/>
                    <Button onClick={ handleSubmit } clickable={true} text="Guardar" group={true}/>
                </div>
                {
                    !isPaciente 
                    && <span onClick={e => handleAddPacienteClick(e)} className="link link-err mb-5">
                        Este cliente todavía no es un paciente, click aquí para agregarlo.
                      </span>
                }
            </form>
        </div>
    )
}
