import React from 'react'
import { useForm } from '../hooks/useForm'
import {useDispatch} from 'react-redux'
import { startLogin } from '../../actions/auth'
import {areLoginInputsValid} from '../controllers/auth.controller'
import { Input } from '../ui/Input'
import { ErrorHelp } from '../ui/ErrorHelp'

export const LoginScreen = () => {

    const dispatch = useDispatch()
    const handleLogin = () => dispatch(startLogin(formValues))

    const [formValues, handleInputChange, handleSubmit, errors] = useForm({
        user: '',
        pwd: ''
    }, areLoginInputsValid, handleLogin)

    const {user, pwd} = formValues

    return (
        <>
            <h3 className="auth__title mb-5">Ingresá <i className="fas fa-sign-in-alt"></i></h3>
            <form onSubmit={handleSubmit}>
                <Input handleInputChange={handleInputChange} placeholder="Usuario" errors={errors} type="text" value={user}  name="user"/>
                {
                    errors.user && (<ErrorHelp isAuth={true} message={errors.user} />)
                }
                    
                <Input handleInputChange={handleInputChange} errors={errors} placeholder="Contraseña" type="password" value={pwd} name="pwd"/>
                {
                    errors.pwd && (<ErrorHelp isAuth={true} message={errors.pwd} />)
                }
                <button className="btn btn__primary btn__block pointer mb-5" type="submit">Login</button>
            </form>
        </>
    )
}
