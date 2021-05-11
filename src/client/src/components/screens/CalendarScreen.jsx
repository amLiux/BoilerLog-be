import React, {useState, useEffect} from 'react'
import { useCalendar } from '../hooks/useCalendar'
import { CalendarHeader } from '../ui/calendar/CalendarHeader'
import { Dia } from '../ui/calendar/Dia'
import { useDispatch, useSelector } from 'react-redux'
import { setDiaActivo, setModalActivo } from '../../actions/ui'
import { startLoadingCitas } from '../../actions/citas'

export const CalendarScreen = () => {

    const dispatch = useDispatch()

    const [nav, setNav] = useState(0)

    const {totalCitas} = useSelector(state => state.citas)

    const [dias, dateDisplay] = useCalendar(totalCitas, nav)

    useEffect(() => {
        dispatch(startLoadingCitas())
    }, [dispatch])


    const handleDiaClick = (dia) => {
        if(dia.value !== 'padding'){
            dispatch(setModalActivo('CALENDARIO'))
            dispatch(setDiaActivo(dia))
        }
    }

    return (
        <div style={{height: '86vh'}} className="main-container">
            <div style={{textAlign:'center', width: '100%', display: 'flex', justifyContent: 'space-evenly', marginTop: '1rem', fontSize: '1rem'}}> 
                <div style={{display: 'flex', alignItems: 'center'}}>
                    Completada
                    <div style={{width:  '1rem', height: '1rem', backgroundColor: 'hsla(0,0%,60%,.8)', borderRadius: '50%', marginLeft: '.5rem'}}></div>  
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    Agendada
                    <div style={{width:  '1rem', height: '1rem', backgroundColor: 'rgba(0,128,0,.6)', borderRadius: '50%', marginLeft: '.5rem'}}></div> 
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    Pendiente
                    <div style={{width:  '1rem', height: '1rem', backgroundColor: 'rgba(236,225,9,.7)', borderRadius: '50%', marginLeft: '.5rem'}}></div> 
                </div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    Cancelada
                    <div style={{width:  '1rem', height: '1rem', backgroundColor: 'hsla(0,100%,72%,.8)', borderRadius: '50%', marginLeft: '.5rem'}}></div> 
                </div>
            </div>
            <CalendarHeader onNext={()=> setNav(nav + 1)} onBack={()=> setNav(nav - 1)} dateDisplay={dateDisplay} />
            <div className="calendar__weekdays">
                <div>Domingo</div>
                <div>Lunes</div>
                <div>Martes</div>
                <div>Miércoles</div>
                <div>Jueves</div>
                <div>Viernes</div>
                <div>Sábado</div>
            </div>
            <div className="calendar__content">
                {dias.map((dia, i) => 
                    <Dia 
                        key={i} 
                        day={dia} 
                        onClick={() => handleDiaClick(dia)}/>)
                }
            </div>
        </div>
    )
}
