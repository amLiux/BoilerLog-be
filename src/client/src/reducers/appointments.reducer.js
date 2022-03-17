import { types } from '../types/types';

const initialState = {
	hasActiveAppointment: false,
	appointment: {},
	totalAppointments: [],
};

export const appointmentsReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.appointmentsSetActiveAppointment:
			return {
				...state,
				appointment: action.payload,
				hasActiveAppointment: true
			};

		case types.appointmentsRemoveActiveAppointment:
			return {
				...state,
				appointment: {},
				hasActiveAppointment: false
			};

		case types.appointmentsSetAppointments:
			return {
				...state,
				totalAppointments: action.payload.appointments
			};

		case types.appointmentsRemoveAppointments: {
			return {
				hasActiveAppointment: false,
				appointment: {},
				totalAppointments: []
			};
		}

		case types.updateAppointments: {
			return {
				...state,
				totalAppointments: state.totalAppointments.map(
					appointment => appointment._id === action.payload._id
						? action.payload
						: appointment
				)
			};
		}

		case types.appointmentsAddAppointment: {
			return {
				...state,
				totalAppointments: [...state.totalAppointments, action.payload]
			};
		}

		default:
			return state;
	}
};