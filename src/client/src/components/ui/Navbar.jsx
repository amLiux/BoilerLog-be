import React from 'react'
import { NavLink } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { startLogout } from '../../actions/auth'
import { clearCitas } from '../../actions/citas'
import { clearPacientes } from '../../actions/pacientes'

export const Navbar = () => {

    const dispatch = useDispatch()

    const {rol} = useSelector(state => state.auth)

    const handleLogout = (e) => {
        e.preventDefault()
        dispatch(clearCitas())
        dispatch(clearPacientes())
        dispatch(startLogout())
    }

    return (
        <nav className="nav">
            <ul className="nav__links">
                <li>
                    <NavLink 
                        activeClassName="nav__links-active"
                        exact={true}
                        to="/dentaltask"
                    >
                        <i className="fas fa-home"></i>
                        <span className="icon-text"> Home</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        activeClassName="nav__links-active"
                        to="/dentaltask/calendario"
                    >
                        <i className="fas fa-calendar-alt"></i>
                        <span className="icon-text"> Calendario</span>
                    </NavLink>
                </li>
                <li>
                    <NavLink 
                        activeClassName="nav__links-active"
                        to="/dentaltask/pacientes"
                    >
                        <i className="fas fa-user-injured"></i>
                        <span className="icon-text"> Pacientes</span>
                    </NavLink>
                </li>
                {
                    rol === 'ADMIN_ROLE' &&
                    <>
                        <li>
                            <NavLink 
                                activeClassName="nav__links-active"
                                to="/dentaltask/reportes">
                                <i className="fas fa-file-contract"></i>
                                <span className="icon-text"> Reportes</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink 
                                activeClassName="nav__links-active"
                                to="/dentaltask/usuarios">
                                <i className="fas fa-users"></i>
                                <span className="icon-text"> Usuarios</span>
                            </NavLink>
                        </li>
                    </>
                }
                <li>
                    <NavLink 
                        activeClassName="nav__links-active"
                        to="/dentaltask/configuracion"
                    >
                        <i className="fas fa-cogs"></i>
                        <span className="icon-text"> Configuración</span>
                    </NavLink>
                </li>
                <button className="btn btn__primary" onClick={handleLogout}>Cerrar sesión</button>
            </ul>
        </nav>
    )
}