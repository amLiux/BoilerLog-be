import { fetchPutCitas, fetchGetCitas, fetchPostCitas, fetchDeleteCitas } from '../services/fetch'
import {types} from '../types/types'
import { setCitasPaciente } from './pacientes'
import { setDiaActivo, setToastActivo } from './ui'

export const setCitaActiva = (cita) => ({
    type: types.citasSetCitaActiva,
    payload: {
        ...cita
    }
})

export const removeCitaActiva = () => ({type: types.citasRemoveCitaActiva})

export const startUpdateCita = (cita) => {
    return async (dispatch, getState) => {

        const {citasPorPaciente} = getState().pacientes
        const {diaActivo} = getState().ui

        const newCitas = citasPorPaciente.map(
            v => v._id === cita._id
            ? cita
            : v
        )

        if(Object.keys(diaActivo).length > 0) {
            diaActivo.citas = diaActivo.citas.map( val => val._id === cita._id ? cita : val)
            dispatch(setDiaActivo(diaActivo))
        }


        const token = localStorage.getItem('token')
        const resp = await fetchPutCitas(token, cita)
        const {ok, msg, newCita} = await resp.json()

        if(ok){
            dispatch(setToastActivo(msg))
            dispatch(refreshCitas(newCita))
            dispatch(setCitasPaciente(newCitas))
            dispatch(cancelCita())
        }
        
    }
}

const refreshCitas = (cita) => ({
    type: types.citasActualizarCitas,
    payload: cita
})

const cancelCita = () => ({type: types.citasCancelarCita})


export const startCancelingCita = (cita) => {
    return async (dispatch, getState) =>{
        const token = localStorage.getItem('token')
        const resp = await fetchDeleteCitas(token, cita._id)
        const {ok, msg, cita: updatedCita} = await resp.json()
        const {diaActivo} = getState().ui

        diaActivo.citas = diaActivo.citas.map(
            cita => cita._id === updatedCita._id
            ? updatedCita
            : cita
        )
                        
        if(ok){
            dispatch(cancelCita())
            dispatch(setToastActivo(msg))
            dispatch(refreshCitas(updatedCita))
            dispatch(setDiaActivo(diaActivo))
        }
    }
}

const agregarCita = (cita) => ({
    type: types.citasAgregarCita,
    payload: {
        ...cita
    }
})


export const startAddingCita = (paciente, horario) => {
    return async (dispatch, getState) =>{
        const token = localStorage.getItem('token')
        const resp = await fetchPostCitas(token, paciente, horario)
        const {ok, msg, newCita} = await resp.json()
        
        const {diaActivo} = getState().ui

                
        if(ok){
            diaActivo.citas = [newCita, ...diaActivo.citas]
            dispatch(setToastActivo(msg))
            dispatch(agregarCita(newCita))
            dispatch(setDiaActivo(diaActivo))
        }
    }
}

export const clearCitas = () => ({type: types.citasLimpiarCitas})

export const startLoadingCitas = () =>{
    return async dispatch => {
        const token = localStorage.getItem('token')

        const response = await fetchGetCitas(token)
        const {citas} = await response.json()

        citas.length > 0 ? dispatch(setCitas(citas)) : dispatch(setCitas([]))
    }
}

export const setCitas = (citas) => ({
    type: types.citasSetCitas,
    payload:{
        citas: [...citas]
    }
})
