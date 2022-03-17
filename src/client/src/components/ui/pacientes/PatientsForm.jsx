import React, { useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startAddingPatient, startUpdatingPatient, setActivePatient } from '../../../actions/patients';
import { PatientsFormProps } from '../../../constants/propTypes';
import { arePacienteInputsValid } from '../../controllers/pacientes.controller';
import { useForm } from '../../hooks/useForm';
import { Button } from '../Button';
import { Form } from '../Form';

export const PatientsForm = ({ handleClose, isEdit }) => {

	const dispatch = useDispatch();

	let formState;

	const { activePatient } = useSelector(state => state.patients);
	const activePatientRef = useRef(activePatient?._id);

	// si el form se renderiza desde el CalendarModal o se edita algun paciente existente ya tiene unos valores, pero si se intenta crear un paciente queremos un form limpio
	activePatient ? formState = activePatient : formState = {
		nombre: '',
		apellido: '',
		cedula: '',
		email: '',
		numeroTelefonico: ''
	};

	const handleSaveClick = () =>
		isEdit
			? dispatch(startUpdatingPatient(values))
			: dispatch(startAddingPatient(values));


	const [values, handleInputChange, handleSubmit, errors, reset] = useForm(formState, arePacienteInputsValid, handleSaveClick);

	useEffect(() => {
		dispatch(setActivePatient(values));
	}, [values, dispatch]);

	useEffect(() => {
		if (activePatientRef?.current !== activePatient?._id) {
			reset({ ...activePatient });
			activePatientRef.current = activePatient?._id;
		}
	}, [activePatient, reset]);

	return (
		<div className={`edit-form__box-container ${isEdit ? 'edit' : ''} `}>
			<div className={`edit-form__action-bar ${isEdit ? 'edit' : ''} `}>
				<div className="edit-form__action-bar-group">
					{
						handleClose &&
						<div onClick={handleClose} className="edit-form__action-bar-item">
							<i className="far fa-window-close"></i>
						</div>
					}
					<div className="edit-form__action-bar-item">
						<span>{isEdit ? 'Editar Paciente:' : 'Crear Paciente:'}</span>
					</div>
				</div>

			</div>
			<form className={`edit-form__form-container ${isEdit ? 'edit' : ''}`}>
				<Form values={values} handleInputChange={handleInputChange} errors={errors} />
				<div className="edit-form__action-bar-group">
					<Button onClick={handleSubmit} text="Guardar" />
				</div>
			</form>
		</div>
	);
};

PatientsForm.propTypes = PatientsFormProps;