import { fetchGetUsers, fetchPutUser, fetchRegister } from '../services/fetch'
import {types} from '../types/types'
import { setToastActivo } from './ui'


export const startLoadingUsers = () =>{
    return async dispatch => {
        const token = localStorage.getItem('token')

        const response = await fetchGetUsers(token)
        const {ok, users} = await response.json()

        ok && users.length > 0 ? dispatch(setUsers(users)) : dispatch(setUsers([]))
    }
}

const setUsers = (users) => ({
    type: types.usersSetUsers,
    payload:{
        users: [...users]
    }
})

export const startRegularRegister = ({email, pwd, name, lastName, user}, admin) => {
    return async (dispatch, getState) => {
        const resp = await fetchRegister(email, pwd, name, lastName, user, admin)
        const {ok, newUser, errors, msg} = await resp.json()
        
        const {totalUsers} = getState().usuarios

        if(ok){
            dispatch(setUsers([...totalUsers, newUser]))
            dispatch(setToastActivo(msg))
        }else{
            errors 
                ? dispatch(setToastActivo(errors[Object.keys(errors)[0]].msg))
                : dispatch(setToastActivo(msg))
        }
    }
}

export const startDisablingUser = (_id) =>{
    return async (dispatch, getState) => {
        const token = localStorage.getItem('token')

        const response = await fetchPutUser(token, _id)
        const {ok, msg, newUser} = await response.json()

        let {totalUsers} = getState().usuarios

        if(ok){
            totalUsers = totalUsers.map(user => user._id === newUser._id ? newUser : user)
            dispatch(setUsers(totalUsers))            
            dispatch(setToastActivo(msg))
        }
    }
}

export const startUpdatingUser = (_id, update) =>{
    return async (dispatch, getState) => {
        const token = localStorage.getItem('token')
        const response = await fetchPutUser(token, _id, update)
        const {ok, msg, newUser} = await response.json()

        let {totalUsers} = getState().usuarios

        if(ok){
            totalUsers = totalUsers.map(user => user._id === newUser._id ? newUser : user)
            dispatch(setUsers(totalUsers))            
            dispatch(setToastActivo(msg))
        }
    }
}