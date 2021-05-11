import React from 'react'
import { useDispatch } from 'react-redux'
import { startDisablingUser } from '../../../actions/users'

export const Usuario = ({usuario, email, nombre, rol, estado, id, handleEdit}) => {
    const dispatch = useDispatch()

    const handleDisable = () => dispatch(startDisablingUser(id))

    const generateRolString = (rol) => rol === 'USER_ROLE' ? 'Usuario' : 'Administrador'

    return (
        <div style={{transition: 'all ease-in-out .3s'}} className={`b-bottom grid__body-item ${!estado && 'linethrough'}`}>
            <span className="col-1-of-5">{usuario}</span>
            <span className="col-1-of-5">{nombre}</span>
            <span className="col-1-of-5">{email}</span>
            <span className="col-1-of-5">{generateRolString(rol)}</span>
            <span style={{display: 'flex', justifyContent: 'space-around'}} className="col-1-of-5">
                <i onClick={() => handleDisable()} className="fas fa-user-slash delete"></i>
                {
                    estado && <i className="fas fa-edit edit" onClick={handleEdit}></i>
                }
            </span>
        </div>
    )

}