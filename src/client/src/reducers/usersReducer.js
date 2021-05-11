import {types} from '../types/types'

const initialState = {
    totalUsers: [],
}

export const usersReducer = (state=initialState, action) =>{
    switch (action.type) {
        case types.usersSetUsers:
            return {
                ...state,
                totalUsers: action.payload.users
            }
            
      
        default:
            return state;
    }
}