import {types} from '../types/types'

const initialState = {
    horarioActivo: 0
}

export const horariosReducer = (state=initialState, action) =>{
    switch (action.type) {
        case types.horariosSetHorario:
            return {
                ...state,
                horarioActivo: action.payload.horario
            }
        
        default:
            return state;
    }
}