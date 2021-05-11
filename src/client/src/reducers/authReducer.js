import {types} from '../types/types'

const initialState = {
    checking: true,
}

export const authReducer = (state=initialState, action) =>{
    switch (action.type) {
        case types.authLogin:
            return {
                ...state,
                ...action.payload,
                checking: false
            }
        
        case types.authCheckingFinished:
            return{
                ...state,
                checking: false
            }
            
        case types.logout: 
            return{
                checking: false
            }
    
        default:
            return state;
    }
}