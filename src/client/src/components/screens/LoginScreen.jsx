import { useDispatch } from 'react-redux';
import { useForm } from '../hooks/useForm';
import { startLogin } from '../../actions/auth';
import { areLoginInputsValid } from '../controllers/auth.controller';
import { Button } from '../ui/Button';
import { Form } from '../ui/Form';

export const LoginScreen = () => {

	const dispatch = useDispatch();
	const handleLogin = () => dispatch(startLogin(formValues));

	const [formValues, handleInputChange, handleSubmit, errors] = useForm({
		user: '',
		pwd: ''
	}, areLoginInputsValid, handleLogin);

	return (
		<>
			<h3 className="auth__title mb-5">Ingresá <i className="fas fa-sign-in-alt"></i></h3>
			<form onSubmit={handleSubmit}>
				<Form 
					values={formValues} 
					handleInputChange={handleInputChange} 
					errors={errors} 
					isAuthForm 
				/>
				<Button text="Ingresá" />
			</form>
		</>
	);
};
