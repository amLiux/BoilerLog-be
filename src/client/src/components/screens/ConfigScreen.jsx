import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startUpdatingUser } from '../../actions/users'
import { Checkbox } from '../ui/Checkbox'
import { Input } from '../ui/Input'
import { Toast } from '../ui/Toast'

export const ConfigScreen = () => {

    const config = JSON.parse(localStorage.getItem('config')) || {
        citasCanceladasEnCalendario: false,
        citasCompletadasEnCalendario: false,
    }

    const firstUpdate = useRef(true);
    const [pwd, setPwd] = useState('')

    const {uid} = useSelector(state => state.auth)

    const dispatch = useDispatch()

    const {mensajeToast, toastAbierto, modalAbierto} = useSelector(state => state.ui)

    const handleKeyDown = (e) => {
        e.key === 'Enter' && dispatch(startUpdatingUser(uid, {pwd}))
        setPwd('')
    }

    const [canceled, setCanceled] = useState(config.citasCanceladasEnCalendario)
    const [completed, setCompleted] = useState(config.citasCompletadasEnCalendario)

    const handlePwdChange = ({target}) => setPwd(target.value)

    const handleCitasCanceladas = () => setCanceled(!canceled)
    const handleCitasCompletadas = () => setCompleted(!completed)

    useEffect(()=> {
        if (firstUpdate.current) {
            firstUpdate.current = false;
            return;
        }
        localStorage.setItem('config', JSON.stringify({
            citasCompletadasEnCalendario: completed, 
            citasCanceladasEnCalendario: canceled
        }))
    },
    [canceled, completed])

    return (
        <>
            {toastAbierto && !modalAbierto && <Toast context="screen" success={true} error={mensajeToast.error} />}
            <div className="main-container">
                <div style={{display: 'flex', width: '50%', margin: '0 auto', flexDirection:'column', height: '100%' }}>
                        <div className="mt-10" style={{marginBottom: 'auto'}}>
                            <Checkbox 
                                handleCheck={handleCitasCanceladas}
                                checked={config.citasCanceladasEnCalendario}
                                setting="¿Quieres que aparezcan las citas canceladas en el calendario?"
                                helpMessage="No las vas a borrar del sistema, solo no van a aparecer en tu calendario."
                            />
                            <Checkbox 
                                handleCheck={handleCitasCompletadas}
                                checked={config.citasCompletadasEnCalendario}
                                setting="¿Quieres que aparezcan las citas completadas en el calendario?"
                                helpMessage="No las vas a borrar del sistema, solo no van a aparecer en tu calendario."
                            />
                            <div className="mt-10" style={{ display:'flex', justifyContent:'space-around'}}>
                                <h5>Quieres reiniciar tu contraseña?</h5>
                                <Input onKeyDown={handleKeyDown} handleInputChange={handlePwdChange} name="newPwd" placeholder="Escribe aqui tu nueva contraseña..." type="password" errors={{}}/>  
                            </div>  
                            <span style={{fontSize: '11px', fontWeight:'400'}}>Cuando estes listo, presiona <kbd>Enter &#8617;</kbd></span>
                        </div>

                        <div>
                            <div className="mt-10 mb-5" style={{width: '100%', textAlign: 'center'}}>
                                <a href="/mypadre" style={{textAlign: 'center', width: '100%'}}>Manual de usuario</a>
                            </div>
                            <div className="mb-10" style={{width: '100%', textAlign: 'center'}}>
                                <a href="/mypadre" style={{textAlign: 'center', width: '100%'}}>Acerca del sistema</a>
                            </div>
                        </div>
                </div>
            </div>
        </>
    )
}
