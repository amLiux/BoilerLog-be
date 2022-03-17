import { shape, number, string, func, bool, arrayOf, oneOfType, object, array, instanceOf } from 'prop-types';

const AppointmentShape = shape({
	apellido: string.isRequired,
	email: string.isRequired,
	estado: string.isRequired,
	fechaCreada: string.isRequired,
	fechaDeseada: string.isRequired,
	idPaciente: string,
	nombre: string.isRequired,
	numeroTelefonico: string.isRequired,
	__v: number.isRequired,
	_id: string.isRequired,
});

const DayShape = shape({
	value: oneOfType([string, number]).isRequired,
	appointments: arrayOf(AppointmentShape),
	isToday: bool.isRequired,
	date: string.isRequired,
});

const PatientShape = shape({
	apellido: string.isRequired,
	cedula: string.isRequired,
	email: string.isRequired,
	fechaCreado: string,
	nombre: string.isRequired,
	numeroTelefonico: string.isRequired,
	__v: number,
	_id: string,
});

const ReportInputShape = shape({
	name: string.isRequired,
	value: oneOfType([string, instanceOf(Date)]),
	label: string.isRequired,
	requiresValidation: object,
});

const ReportShape = shape({
	name: string.isRequired,
	requiredInputs: arrayOf(ReportInputShape),
	type: string.isRequired,
});

export const UserShape = shape({ 
	_id: string.isRequired, 
	estado: string.isRequired, 
	nombre: string.isRequired, 
	apellido: string.isRequired, 
	email: string.isRequired, 
	user: string.isRequired, 
	rol: string.isRequired 
});


// Components Props

export const CalendarHeaderProps = {
	dateDisplay: string.isRequired,
	onNext: func.isRequired,
	onBack: func.isRequired,
};

export const DayProps = {
	day: DayShape.isRequired,
	onClick: func.isRequired,
};

export const SimpleBannerProps = {
	handleCreateScreen: func.isRequired,
};

export const BannerProps = {
	handleCreateScreen: func.isRequired,
	simpleBanner: bool,
};

export const CalendarModalProps = {
	day: DayShape.isRequired,
	isModalOpen: bool,
	handleClose: func.isRequired,
};

export const NewAppointmentFormProps = {
	callback: func.isRequired,
};

export const AppointmentFormProps = {
	appointment: AppointmentShape,
};

export const NotPatientFormProps = {
	values: AppointmentShape.isRequired,
	handleInputChange: func.isRequired,
	errors: object.isRequired,
	handleReset: func.isRequired,
	handleSubmit: func.isRequired,
};

export const UpdateAppointmentFormProps = {
	values: AppointmentShape.isRequired,
	setHorario: func,
	handleDelete: func.isRequired,
	handleSubmit: func.isRequired,
	hasChanged: bool.isRequired,
	setHasChanged: func.isRequired,
	hours: oneOfType([number, string]),
};

export const SelectPatientProps = {
	handleState: func.isRequired,
};

export const SelectScheduleProps = {
	handleState: func.isRequired,
	hours: oneOfType([number, string]),
};

export const SidebarProps = {
	handleClose: func.isRequired,
};

export const DashboardProps = {
	heading: string.isRequired,
	time: string.isRequired,
	text: string.isRequired,
	appointments: oneOfType([arrayOf(AppointmentShape)], array),
};

export const CardSliderProps = {
	patientId: string.isRequired,
};

export const AppointmentCardProps = {
	appointment: oneOfType([arrayOf(AppointmentShape)], array),
};

export const FileProps = {
	name: string.isRequired,
	uploadDate: string.isRequired,
	patientId: string.isRequired,
	fileId: string.isRequired,
};

export const FileListProps = {
	patientId: string.isRequired,
};

export const PatientsDashboardProps = {
	patientId: string.isRequired,
};

export const PatientsFormProps = {
	handleClose: func,
	isEdit: bool,
};

export const PatientsListProps = {
	patients: arrayOf(oneOfType([array, PatientShape])),
	style: object,
};

export const PatientsModalProps = {
	isModalOpen: bool,
	handleClose: func.isRequired,
};

export const SelectReportProps = {
	handleState: func.isRequired,
};

export const ReportProps = {
	report: ReportShape.isRequired,
};

export const ReportFormProps = {
	requiredInputs: arrayOf(ReportInputShape).isRequired,
	handleMonthInput: func.isRequired,
	rendered: bool,
	handleReportDownload: func.isRequired,
};

export const UsersListProps = {
	totalUsers: arrayOf([UserShape]).isRequired,
	handleEdit: func.isRequired
};

export const ToastProps = {
	msg: string.isRequired,
	success: bool.isRequired,
};

export const TextareaProps = {
	name: string.isRequired, 
	handleInputChange: func.isRequired, 
	value: oneOfType([string, number]).isRequired, 
	placeholder: string.isRequired, 
	disabled: bool.isRequired
};

export const SpinnerProps = {
	size: string,
};

export const RadioButtonProps = {
	estado: string.isRequired,
	date: string.isRequired,
	horario: string,
	label: string.isRequired,
	onChange: func.isRequired,
	sidebarBtn: bool,
};

export const InputGroupProps = {
	isEdit: bool,
	search: bool,
	value: string, 
	label: string, 
	handleInputChange: func, 
	name: string.isRequired,
};

// TODO do we want to abstract each form (auth, patient) and its errors
export const FormProps = {
	values: object.isRequired,
	handleInputChange: func.isRequired,
	errors: object.isRequired,
	isAuthForm: bool,
};

export const InputProps = {
	type: string.isRequired, 
	handleInputChange: func.isRequired, 
	errors: object, 
	value: string, 
	name: string.isRequired, 
	placeholder: string.isRequired, 
	onKeyDown: func, 
	isAuthForm: bool,
};

export const ErrorHelpProps = {
	isAuth: bool,
	msg: string.isRequired,
};

export const CheckboxProps = {
	handleCheck: func.isRequired, 
	setting: string.isRequired, 
	helpMessage: string.isRequired, 
	checked: bool.isRequired
};