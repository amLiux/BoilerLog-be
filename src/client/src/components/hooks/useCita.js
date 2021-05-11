import { useEffect, useRef, useState } from 'react'

export const useCita = ([cita], callback) => {
    const [editNote, setEditNote] = useState(false)
    
    const [nota, setNota] = useState(cita?.nota || 'No hay notas para esta cita, agrega una!')
    const [stringEstado, setStringEstado] = useState('')

    const activeCita = useRef(cita._id)

    const fecha = new Date(cita?.fechaDeseada).toLocaleDateString(),
        newFecha = fecha === 'Invalid Date' ?  'No hay citas' : fecha, 
        estado = cita?.estado

    const handleInputChange = ({target}) => {
        setNota(target.value)
    }

    const handleEditClick = () => {
        setEditNote(!editNote)
        if(editNote){
            callback()
        }
    }


    useEffect(()=> {
        if(activeCita.current !== cita._id){
            setNota(cita?.nota || 'No hay notas para esta cita, agrega una!')
            activeCita.current = cita._id
        }
        setStringEstado(getEstadoString(estado))
    }, [cita, estado])
    

    const getEstadoString = (estado) => 
        estado === 'CANCELADA' ? 'Cancelada' : 
        estado === 'AGENDADA' ? 'Agendada' : 
        estado === 'PENDIENTE' ? 'Pendiente' : 
        estado === 'COMPLETADA' ? 'Completada' : ''
    

    return [ editNote, handleEditClick, nota, handleInputChange, stringEstado, estado, newFecha ]

}