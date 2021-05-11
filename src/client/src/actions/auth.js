import {types} from '../types/types'
import { fetchLogin, fetchValidateJWT } from '../services/fetch'
import { setToastActivo } from './ui'


export const login = (uid, displayName, rol) => ({
    type: types.authLogin,
    payload: {
        uid,
        displayName,
        rol
    }
})

export const startLogin = ({user, pwd}) => {
    return async (dispatch)=> {
        const resp = await fetchLogin(user, pwd)
        const body = await resp.json()

        if(body.ok){
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(login(body.uid, body.user, body.rol))
        }else{
            dispatch(setToastActivo(body.msg))
        }
        
    }
}


export const startLogout = () => {
    return async (dispatch) => {
        localStorage.removeItem('token')
        localStorage.removeItem('token-init-date')

        dispatch(logout())
    }
}

export const logout = () => ({type: types.logout})


export const startChecking = () => {
    return async (dispatch) => {
        const token = localStorage.getItem('token')
        const resp = await fetchValidateJWT(token)
        const body = await resp.json()

        if(body.ok){
            localStorage.setItem('token', body.token)
            localStorage.setItem('token-init-date', new Date().getTime())
            dispatch(login(body.uid, body.name, body.rol))
        }else{
            dispatch(checkingFinished())
        }

    }
}

export const checkingFinished = () => ({type: types.authCheckingFinished})