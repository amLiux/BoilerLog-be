import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLoadingCitasPaciente } from '../../../actions/pacientes'
import { usePagination } from '../../hooks/usePagination'
import { CitasCard } from './CitasCard'

export const CardSlider = ({paciente: {_id}}) => {

    const dispatch = useDispatch()
    const { citasPorPaciente } = useSelector(state => state.pacientes)

    const [currentCita, currentPage , handleChangePage, maxPage] =  usePagination(citasPorPaciente, 1)
    
    useEffect(()=>{
        dispatch(startLoadingCitasPaciente(_id))
    }, [_id, dispatch])

    return (
        <>
            { citasPorPaciente.length <= 0 ?
                <>
                    <i className="fas fa-info-circle"><span> No hay citas para este paciente </span></i>
                </>
                : 
                <>
                    {
                        citasPorPaciente.length !== 1 && currentPage !== 1 && <i onClick={()=> handleChangePage("back")} className="fas fa-arrow-left"></i>
                    }
                    
                    <CitasCard cita={currentCita}/>
                    
                    {
                        citasPorPaciente.length !== 1 && currentPage !== maxPage && <i onClick={()=> handleChangePage("next")}  className="fas fa-arrow-right"></i>
                    }
                </>
            }
        </>
    )
}
