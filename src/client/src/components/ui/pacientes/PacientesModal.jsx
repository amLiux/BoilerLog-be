import React from 'react'
import { useSelector } from 'react-redux'
import { Toast } from '../Toast'
import { PacientesForm } from './PacientesForm'

export const PacientesModal = ({ modalAbierto, handleClose }) => {
    
    const {mensajeToast, toastAbierto} = useSelector(state => state.ui)

    return (
        <div className={`modal-background ${modalAbierto ? 'modal-showing' : ''}`}>
            {toastAbierto && <Toast success={true} error={mensajeToast.error} />}
            <div className="modal-inner d-flex">
                <div className="modal-form">
                    <PacientesForm handleClose={handleClose}/>
                </div>
            </div>
        </div>
    )
}
