import React, { useEffect, useState } from 'react'
import { useForm } from '../hooks/useForm'
import { areInputsValid } from '../controllers/auth.controller'
import { useDispatch } from 'react-redux'
import { startRegularRegister } from '../../actions/users'
import { Input } from '../ui/Input'
import { ErrorHelp } from '../ui/ErrorHelp'
import { Button } from '../ui/Button'
import { setToastActivo } from '../../actions/ui'
import { Checkbox } from '../ui/Checkbox'

export const RegisterScreen = ({isEdit}) => {
                 
    const [admin, setAdmin] = useState(false)

    const dispatch = useDispatch()

    const handleRegister = () => {
        dispatch(startRegularRegister(values, admin))
        reset()
    }
    
    const [values, handleInputChange, handleSubmit, errors, reset] = useForm({
        email: '',
        user: '',
        name: '',
        lastName: '',
        pwd: '',
        confPwd: '',
    }, areInputsValid, handleRegister)
        
    let {email, pwd, confPwd, name, lastName, user} = values
    
    useEffect(() => {
        if (Object.keys(errors).length === 1 ) {
            const errorMessage = errors[Object.keys(errors)[0]]
            dispatch(setToastActivo(errorMessage))
        }
    }, [errors, dispatch])

    return (
        <>
            <h3 className="auth__title mb-5">{isEdit ? 'Editar' : 'Crea una cuenta'}<i className="fas fa-user-plus"></i></h3>
            <form onSubmit={handleSubmit}>
                <Input 
                    handleInputChange={handleInputChange} 
                    placeholder="Email" 
                    errors={errors} 
                    type="email" 
                    value={email}  
                    name="email"/>
                {
                    errors.email && (<ErrorHelp message={errors.email} />)
                }
                <Input handleInputChange={handleInputChange} placeholder="Usuario" errors={errors} type="text" value={user}  name="user"/>   
                {
                    errors.user && (<ErrorHelp message={errors.user} />)
                }
                <Input handleInputChange={handleInputChange} errors={errors} placeholder="Nombre" type="text" value={name} name="name"/>
                {
                    errors.name && (<ErrorHelp message={errors.name} />)
                }
                <Input handleInputChange={handleInputChange} errors={errors} placeholder="Apellido" type="text" value={lastName} name="lastName"/>
                {
                    errors.lastName && (<ErrorHelp message={errors.lastName} />)
                }
                <Input handleInputChange={handleInputChange} errors={errors} placeholder="Contraseña" type="password" value={pwd} name="pwd"/>
                {
                    errors.pwd && (<ErrorHelp message={errors.pwd} />)
                }
                <Input handleInputChange={handleInputChange} errors={errors} placeholder="Confirma la contraseña" type="password" value={confPwd} name="confPwd"/>
                {
                    errors.confPwd && (<ErrorHelp message={errors.confPwd} />)
                }
                <Checkbox setting="Administrador?" checked={setAdmin} handleCheck={() => setAdmin(!admin)}/>
                <Button text="Crear"/>
            </form>
        </>
    )
}
