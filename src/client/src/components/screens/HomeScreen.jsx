import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingCitas } from '../../actions/citas';
import { Dashboard } from '../ui/home/Dashboard'

export const HomeScreen = () => {

    const dispatch = useDispatch()

    const {totalCitas} = useSelector(state => state.citas)

    useEffect(() => dispatch(startLoadingCitas()), [dispatch])

    
    const todayObj = new Date();
    const todayDate = todayObj.getDate();
    const todayDay = todayObj.getDay();
    
    const firstDayOfWeek = new Date(todayObj.setDate(todayDate - todayDay + 1 ));
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(lastDayOfWeek.getDate() + 5);


    const citasEstaSemana = totalCitas.filter(cita => new Date(cita.fechaDeseada) >= firstDayOfWeek && new Date(cita.fechaDeseada) <= lastDayOfWeek && cita.estado === 'AGENDADA' && cita)
    const citasSinConfirmar = totalCitas.filter( cita =>  new Date(cita.fechaDeseada) >= firstDayOfWeek && new Date(cita.fechaDeseada) <= lastDayOfWeek && cita.estado === 'PENDIENTE')
    const citasCanceladas = totalCitas.filter( cita =>  new Date(cita.fechaDeseada) >= firstDayOfWeek && new Date(cita.fechaDeseada) <= lastDayOfWeek && cita.estado === 'CANCELADA')


    return (
        <div className="main-container">
            <h1 style={{textAlign: 'center', marginTop: '1.5rem', marginBottom: '-3rem', fontWeight: '500'}}>Información importante: </h1>
            <div className="dashboard-home">
                <Dashboard data={citasEstaSemana} heading="Citas agendadas" time="esta semana" text="Abajo puedes encontrar la fecha y el paciente de las citas actualmente agendadas. Si ves un botón de completar quiere decir que la fecha hábil de esta cita ya pasó, complétala." />
                <Dashboard data={citasSinConfirmar} heading="Citas sin confirmar" time="esta semana" text="Abajo vas a encontrar los pacientes que crearon una cita en la página web, pero no han confirmado el horario, puedes ir al módulo de Pacientes y contactar al paciente para confirmar su cita."/>
                <Dashboard data={citasCanceladas} heading="Citas canceladas" time="esta semana" text="Abajo vas a encontrar las citas que fueron canceladas esta semana, puedes contactar al paciente y/o doctor para reagendar de ser necesario."/>
            </div>
        </div>
    )
}
