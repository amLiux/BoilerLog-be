import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { startLoadingUsers } from '../../actions/users'
import { Toast } from '../ui/Toast'
import { UsuariosList } from '../ui/usuarios/UsuariosList'
import { RegisterScreen } from './RegisterScreen'


export const UserManagementScreen = () => {

    const dispatch = useDispatch()
    const {mensajeToast, toastAbierto, modalAbierto} = useSelector(state => state.ui)
    const [edit, setEdit] = useState(false)

    const {totalUsers} = useSelector(state => state.usuarios)

    useEffect(() => {
        dispatch(startLoadingUsers())
    }, [dispatch]);

    return (
        <>
            {toastAbierto && !modalAbierto && <Toast context="screen" success={true} error={mensajeToast.error} />}
            <div style={{width: '100%', display: 'flex', justifyContent: 'space-around'}}>
                <div className="main-container" style={{width: '25%' , height: '77%'}}>
                    <div style={{width: '90%', margin: '2.2rem auto'}}>
                        <RegisterScreen isEdit={edit}/>
                    </div>

                </div>
                <div className="main-container" style={{width: '65%', minHeight: '100%', overflow: 'auto'}}>
                    <UsuariosList handleEdit={() => setEdit(!edit)} totalUsers={totalUsers} />
                </div>
            </div>
        </>
    )
}
