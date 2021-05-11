import {types} from '../types/types'

const initialState = {
    isPacienteActive: false,
    pacienteActivo: {},
    totalPacientes: [],
    citasPorPaciente: [],
    archivosPorPaciente: []
}

export const pacientesReducer = (state=initialState, action) =>{
    switch (action.type) {
        case types.pacientesSetPacientes:
            return {
                ...state,
                totalPacientes: action.payload.pacientes
            }
            
        case types.pacientesActualizarPacientes:
            return{
                ...state,
                totalPacientes: state.totalPacientes.map(
                    paciente => paciente._id === action.payload._id
                    ? action.payload
                    : paciente
                )
            }

        case types.pacienteSetPacienteActivo:
            return{
                ...state,
                isPacienteActive: true,
                pacienteActivo: action.payload
            }

        case types.pacienteRemovePacienteActivo:
            return{
                ...state,
                isPacienteActive: false,
                pacienteActivo: null
            }
        
        case types.pacienteSetCitasPaciente:
            return{
                ...state,
                citasPorPaciente: [...action.payload]
            }

        case types.pacienteSetArchivosPaciente:
            return{
                ...state,
                archivosPorPaciente: [...action.payload]
            }
        

        case types.pacienteClearPacientes: 
            return{
                ...state,
                ...initialState
            }
        
    

        default:
            return state;
    }
}