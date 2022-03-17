import { types } from '../types/types';

const initialState = {
	hasActivePacient: false,
	activePatient: {},
	totalPatients: [],
	patientAppointments: [],
	patientFiles: []
};

export const patientsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.patientsSetPatients:
			return {
				...state,
				totalPatients: action.payload.patients
			};

		case types.patientsUpdatePatient:
			return {
				...state,
				totalPatients: state.totalPatients.map(
					patient => patient._id === action.payload._id
						? action.payload
						: patient
				)
			};

		case types.patientsSetActivePatient:
			return {
				...state,
				hasActivePacient: true,
				activePatient: action.payload
			};

		case types.patientsRemoveActivePatient:
			return {
				...state,
				hasActivePacient: false,
				activePatient: null
			};

		case types.patientsSetPatientAppointments:
			return {
				...state,
				patientAppointments: [...action.payload]
			};

		case types.patientsSetPatientFiles:
			return {
				...state,
				patientFiles: [...action.payload]
			};


		case types.patientsClearPatients:
			return {
				...state,
				...initialState
			};

		default:
			return state;
	}
};