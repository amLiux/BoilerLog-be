import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLoadingPacientes } from '../../actions/pacientes'
import { setModalActivo } from '../../actions/ui'
import { usePagination } from '../hooks/usePagination'
import { Button } from '../ui/Button'
import { InputGroup } from '../ui/InputGroup'
import { PacientesDashboard } from '../ui/pacientes/PacientesDashboard'
import { PacientesForm } from '../ui/pacientes/PacientesForm'
import { PacientesList } from '../ui/pacientes/PacientesList'
import { Spinner } from '../ui/Spinner'
import { Toast } from '../ui/Toast'

export const PacientesScreen = () => {
    
    const dispatch = useDispatch()
    
    const handleAddPacientClick = () => dispatch(setModalActivo('PACIENTES'))
    const {mensajeToast, toastAbierto, modalAbierto} = useSelector(state => state.ui)
    const {isPacienteActive, pacienteActivo, totalPacientes} = useSelector(state => state.pacientes)

    const [currentPacientes, currentPage, handleChangePage] = usePagination(totalPacientes, 8)

    const style2 = currentPacientes.length < 8 ? {marginBottom: 'auto'} : {}

    const checkMsg = (msg) => msg === 'Necesitas buscar algo válido'  ? false : true

    useEffect(() => {
        dispatch(startLoadingPacientes())
    }, [dispatch]);

    return (
        <>
            {toastAbierto && !modalAbierto && <Toast context="screen" success={checkMsg(mensajeToast.error)} error={mensajeToast.error} />}
            <div style={{width: '100%', display: 'flex'}}>
                <div className="secondary-container">
                    <div className="main-container__search-group">
                        <form action="">
                            <InputGroup name="busqueda" search={true}/>
                        </form>
                    </div>
                    <PacientesList style={style2} pacientes={currentPacientes}/>
                    {
                        totalPacientes.length > 8 &&
                        <div style={{marginTop: '-3rem'}} className="calendar__header">
                            <Button clickable={true} onClick={()=> handleChangePage("back")} group={true} text={<i className="fas fa-arrow-left"></i>}/>
                            <div className="mb-5">{currentPage}</div>
                            <Button clickable={true} onClick={()=> handleChangePage("next")}  group={true} text={<i className="fas fa-arrow-right"></i>}/>
                        </div>
                    }
                </div>
                <div style={{width: '60%'}} className="main-container">
                    {
                        isPacienteActive 
                            ? <div className="d-flex" style={{justifyContent: 'flex-start', alignItems: 'center', height: '100%'}} >
                                <PacientesForm isEdit={isPacienteActive}/>
                                <PacientesDashboard paciente={pacienteActivo} />
                                </div>
                            : <div className="d-flex">
                                <div className="main-container__banner">
                                    <div>
                                        <Spinner size="big"/>
                                        <h1>Escoje un paciente a la izquierda </h1>
                                    </div>
                                    <h1>o</h1>
                                    <div>
                                        <i onClick={handleAddPacientClick} className="fas fa-user-injured"></i>
                                        <h1>Crea un paciente.</h1>
                                    </div>
                                </div>
                            </div>
                    }
                </div>
            </div>
        </>
    )
}
