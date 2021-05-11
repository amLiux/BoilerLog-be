import { fetchDeleteArchivo, fetchDownloadArchivo, fetchGetArchivosDePacientes, fetchGetCitasDePacientes, fetchGetPacientes, fetchPostFiles, fetchPostPaciente, fetchPutPacientes, fetchSearchPaciente } from '../services/fetch'
import {types} from '../types/types'
import { startLoadingCitas } from './citas'
import { setModalInactivo, setToastActivo } from './ui'

export const startSearchingPaciente = (searchString) => {
    return async (dispatch) => {

        const token = localStorage.getItem('token')
        const resp = await fetchSearchPaciente(token, searchString)
        const body = await resp.json()
        
        if(body?.ok){
            dispatch(setToastActivo(body.msg))
            dispatch(setPacientes(body.pacientes))
        }
        
    }
}

export const startAddingPaciente = (paciente) => {
    return async (dispatch, getState) => {
        const {totalPacientes} = getState().pacientes
        const token = localStorage.getItem('token')
        const resp = await fetchPostPaciente(token, paciente)
        const body = await resp.json()

        console.log(totalPacientes)

        if(body?.ok){
            dispatch(setToastActivo(body.msg))
            dispatch(refreshPaciente(body.createdUser))
            dispatch(setPacientes([...totalPacientes, body.createdUser]))
            dispatch(removePacienteActivo())
            dispatch(setModalInactivo())
            dispatch(startLoadingCitas())
        }
        
    }
}

export const clearPacientes = () => ({type: types.pacienteClearPacientes})

export const setCitasPaciente = (citas) => ({
    type: types.pacienteSetCitasPaciente,
    payload: citas
})

export const setArchivosPaciente = (archivos) => ({
    type: types.pacienteSetArchivosPaciente,
    payload: archivos
})

export const startLoadingCitasPaciente = (_id) => {
    return async (dispatch) => {
        const token = localStorage.getItem('token')
        const response = await fetchGetCitasDePacientes(token, _id)
        const {ok, citas} = await response.json()
        if(ok){
            dispatch(setCitasPaciente(citas))
        }
    }
}

export const startLoadingArchivosPaciente = (_id) => {
    return async (dispatch) => {
        const token = localStorage.getItem('token')
        const response = await fetchGetArchivosDePacientes(_id, token)
        const {ok, archivos} = await response.json()

        if(ok){
            dispatch(setArchivosPaciente(archivos))
        }
    }
}

const refreshPaciente = (paciente) => ({
    type: types.pacientesActualizarPacientes,
    payload: paciente
})

export const startLoadingPacientes = () =>{
    return async dispatch => {
        const token = localStorage.getItem('token')

        const response = await fetchGetPacientes(token)
        const {pacientes} = await response.json()

        pacientes.length > 0 ? dispatch(setPacientes(pacientes)) : dispatch(setPacientes([]))
    }
}

const setPacientes = (pacientes) => ({
    type: types.pacientesSetPacientes,
    payload:{
        pacientes: [...pacientes]
    }
})

export const startUpdatePaciente = (paciente) => {
    return async (dispatch, getState) => {

        let {totalPacientes} = getState().pacientes

        totalPacientes = totalPacientes.map(
            v => v._id === paciente._id
            ? paciente
            : v
        )

        const token = localStorage.getItem('token')
        const resp = await fetchPutPacientes(token, paciente)
        const body = await resp.json()

        if(body?.ok){
            dispatch(setToastActivo(body.msg))
            dispatch(refreshPaciente(paciente))
            dispatch(setPacientes(totalPacientes))
        }
        
    }
}

export const setPacienteActivo = (paciente) => ({
    type: types.pacienteSetPacienteActivo,
    payload: {...paciente}
})

export const removePacienteActivo = () => ({type: types.pacienteRemovePacienteActivo})

export const startUploadingFile = (file, id) => {
    return async (dispatch, getState) => {

        const {archivosPorPaciente} = getState().pacientes

        const token = localStorage.getItem('token')
        const data = new FormData()
        data.append('file', file)

        const resp = await fetchPostFiles(id, data, token)
        const {ok, msg, archivo} = await resp.json()
        console.log(ok)
        console.log(archivosPorPaciente)
        if(ok){
            dispatch(setArchivosPaciente([...archivosPorPaciente, archivo]))
            dispatch(setToastActivo(msg))
        }
    }
}


export const startDeletingFile = (fileId, fileName,  pacienteId) => {
    return async (dispatch, getState) => {

        let {archivosPorPaciente} = getState().pacientes

        archivosPorPaciente = archivosPorPaciente.filter(v => v._id !== fileId)

        const token = localStorage.getItem('token')
        const resp = await fetchDeleteArchivo(pacienteId, fileName, token)
        const body = await resp.json()

        console.log(archivosPorPaciente)

        if(body?.ok){
            dispatch(setToastActivo(body.msg))
            dispatch(setArchivosPaciente(archivosPorPaciente))
        }
    }
}

export const startDownloadingFile = (fileName,  pacienteId) => {
    return async (dispatch) => {

        const token = localStorage.getItem('token')
        const resp = await fetchDownloadArchivo(pacienteId, fileName, token)
        console.log(resp.body)
        const blob = await resp.blob()

        console.log(blob)
        console.log(`estoy llegando aca`)

        let url = window.URL.createObjectURL(blob)
        let a = document.createElement('a')
        a.href = url
        a.download = fileName
        a.click()

    }
}