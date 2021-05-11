import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux'
import { Spinner } from '../Spinner'
import { Toast } from '../Toast'
import { CitaForm } from './CitaForm'
import { EditCita } from './EditCita'
import { Sidebar } from './Sidebar'

export const CalendarModal = ({dia, modalAbierto, handleClose}) => {

    const {citas} = dia

    const [empty, setEmpty] = useState()
    const [create, setCreate] = useState(false)
    
    const { isCitaActive, cita } = useSelector(state => state.citas)
    const {mensajeToast, toastAbierto} = useSelector(state => state.ui)


    useEffect( () => {
        if(citas && citas.length === 0) {
            setEmpty(true) 
        } else{
            setEmpty(false)
            setCreate(false)     
        } 
            
    } , [citas])
    
    
    return (
        <div className={`modal-background ${modalAbierto ? 'modal-showing' : ''}`}>
            {toastAbierto && <Toast success={mensajeToast.error === 'Necesitas llenar los 2 valores' ? false : true} error={mensajeToast.error} />}
            <div className="modal-inner">
                <Sidebar handleClose={handleClose}/>
                <div className="modal-form">
                    {
                        !empty 
                            ?   isCitaActive
                                    ?   <EditCita isEdit={true} cita={cita}/>
                                    :   create 
                                        ?   <CitaForm/>
                                        :   <div className="modal-form__banner">
                                                <div>
                                                    <Spinner size="big"/>
                                                    <h1>Escoje una cita dentro de las opciones a la izquierda!</h1>
                                                </div>
                                                O
                                                <div>
                                                    <i onClick={() => setCreate(true)} className="far fa-calendar-plus"></i>
                                                    <h1>Crea una cita para esta fecha.</h1>
                                                </div>
                                            </div>
                            :   <>
                                    {
                                        create 
                                            ? <CitaForm/>
                                            :
                                            <div className="modal-form__banner">
                                                <div>
                                                    <i onClick={() => setCreate(true)} className="far fa-calendar-plus"></i>
                                                    <h1>Crea una cita para esta fecha.</h1>
                                                </div>
                                            </div>
                                    }
                                </>
                    }


                </div>
            </div>
        </div>
    )
}
