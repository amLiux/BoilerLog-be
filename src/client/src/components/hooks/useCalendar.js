import { useState, useEffect } from 'react'

export const useCalendar = (citas, nav) => {
    
    const [dateDisplay, setDateDisplay] = useState('')
    const [dias, setDias] = useState([])

    useEffect(()=>{

        const citasPorDia = (diaActual) => 
        citas.filter( cita => new Date(cita.fechaDeseada).toDateString() === new Date(diaActual).toDateString() && cita )

        const capitalizar = word => word.charAt(0).toUpperCase() + word.slice(1)
        const semana = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']

        const fecha = new Date()
        nav !== 0 && fecha.setMonth(new Date().getMonth() + nav)
        
        const 
            dia = fecha.getDate(),
            mes = fecha.getMonth(),
            anho = fecha.getFullYear()
    
        const primerDiaDelMes = new Date(anho, mes, 1)
        const diasEnMes = new Date(anho, mes + 1, 0).getDate()
        const dateString = primerDiaDelMes.toLocaleDateString('es-us', {
            weekday: 'long',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric'
        })
    

        const nombreDelPrimerDia = capitalizar(dateString.split(', ')[0])
        const diasComodinInicio = semana.indexOf(nombreDelPrimerDia)

        setDateDisplay(`${capitalizar(fecha.toLocaleDateString('es', {month:'long'}))}`)

        const daysArr = []

        for(let i = 1; i<=diasComodinInicio + diasEnMes; i++){
            const diaActual = `${mes+1}/${i - diasComodinInicio}/${anho}`
            if(i > diasComodinInicio){
                daysArr.push({
                    value: i - diasComodinInicio,
                    citas: citasPorDia(diaActual),
                    esHoy: diaActual.split('/')[1] === dia.toString() && nav === 0 ? true : false,
                    date: diaActual
                })
            }else{
                daysArr.push({
                    value: 'padding',
                    citas: null,
                    esHoy: false,
                    date: ''
                })
            }
        }

        setDias(daysArr)

    }, [citas, nav])

    return [ dias, dateDisplay ]

}