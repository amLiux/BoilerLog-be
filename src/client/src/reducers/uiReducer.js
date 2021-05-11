import {types} from '../types/types'

const estadoInicial = {
    modalAbierto: false,
    tipoModal: '',
    diaActivo: {},
    toastAbierto: false,
    mensajeToast: ''
}

export const uiReducer = (state=estadoInicial, action) =>{
    switch (action.type) {
        case types.uiOpenModal: 
            return {
                ...state,
                modalAbierto: true,
                tipoModal: action.payload

            }

        case types.uiCloseModal: 
            return {
                ...state,
                modalAbierto: false
            }

        case types.uiShowToast: 
            return {
                ...state,
                mensajeToast: action.payload,
                toastAbierto: true
            }
        
        case types.uiRemoveToast: 
            return {
                ...state,
                toastAbierto: false,
                mensajeToast: ''
            }

        case types.uiSetDiaActivo: 
            return {
                ...state,
                diaActivo: action.payload
            }
        
        case types.uiRemoveDiaActivo: 
            return {
                ...state,
                diaActivo: {}
            }
        
        default:
            return state;
    }
}