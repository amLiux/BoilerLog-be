import { fetchPutHorarioCita } from '../services/fetch'
import {types} from '../types/types'


export const setSelectedHorario = ({target}) => ({
    type: types.horariosSetHorario,
    payload:{
        horario: target.value
    }
})

export const startUpdateCitaConHorario = (_id) => {
    return async (dispatch, getState) => {
        const {horarioActivo} = getState().horarios
        
        parseInt(horarioActivo)

        const resp = await fetchPutHorarioCita(_id, horarioActivo)
        const body = await resp.json()
        // TODO do something here
        console.log(body)
    }
}