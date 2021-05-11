import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Route, Switch } from 'react-router-dom'
import { CalendarScreen } from '../components/screens/CalendarScreen'
import { CitasScreen } from '../components/screens/CitasScreen'
import { ConfigScreen } from '../components/screens/ConfigScreen'
import { HomeScreen } from '../components/screens/HomeScreen'
import { PacientesScreen } from '../components/screens/PacientesScreen'
import { CalendarModal } from '../components/ui/calendar/CalendarModal'
import { Navbar } from '../components/ui/Navbar'
import {setModalInactivo, removeDiaActivo, setToastInactivo} from '../actions/ui'
import {removeCitaActiva} from '../actions/citas'
import { PacientesModal } from '../components/ui/pacientes/PacientesModal'
import { removePacienteActivo } from '../actions/pacientes'
import { ReportsScreen } from '../components/screens/ReportsScreen'
import { UserManagementScreen } from '../components/screens/UserManagementScreen'


export const DashboardRoutes = () => {

    const {modalAbierto, diaActivo, tipoModal} = useSelector(state => state.ui)

    const dispatch = useDispatch()

    const handleCloseCalendar = () => {
        dispatch(setModalInactivo())
        dispatch(removeDiaActivo())
        dispatch(removeCitaActiva())
        dispatch(setToastInactivo())
    }

    const handleClosePacientes = () => {
        dispatch(setModalInactivo())
        dispatch(removePacienteActivo())
        dispatch(setToastInactivo())
    }



    return (
        <div className="main">
            <Navbar/>
            { modalAbierto && Object.keys(diaActivo).length !== 0 && tipoModal === "CALENDARIO" && <CalendarModal dia={diaActivo} handleClose={()=> handleCloseCalendar()} modalAbierto={modalAbierto} /> }
            { modalAbierto && tipoModal === "PACIENTES" && <PacientesModal handleClose={()=> handleClosePacientes()} modalAbierto={modalAbierto} /> }
            <div className="main__main-content">
                <Switch>
                    <Route exact path="/dentaltask/" component={HomeScreen} />
                    <Route exact path="/dentaltask/calendario" component={CalendarScreen} />
                    <Route exact path="/dentaltask/citas" component={CitasScreen} />
                    <Route exact path="/dentaltask/pacientes" component={PacientesScreen} />
                    <Route exact path="/dentaltask/reportes" component={ReportsScreen} />\
                    <Route exact path="/dentaltask/usuarios" component={UserManagementScreen} />
                    <Route exact path="/dentaltask/configuracion" component={ConfigScreen} />
                </Switch>
            </div>
        </div>
    )
}
