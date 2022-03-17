import { requestTemplates } from '../constants/HTTP';
import { processRequest } from '../services/processRequest';
import { types } from '../types/types';
import { setPatientAppointments } from './patients';
import { setActiveDay, sendToast } from './ui';

const setAppointments = (appointments) => ({
	type: types.appointmentsSetAppointments,
	payload: {
		appointments: [...appointments]
	}
});

const updateAppointments = (appointment) => ({
	type: types.appointmentsUpdateAppointments,
	payload: appointment
});

const addAppointment = (appointment) => ({
	type: types.appointmentsAddAppointment,
	payload: {
		...appointment
	}
});

export const setActiveAppointment = (appointment) => ({
	type: types.appointmentsSetActiveAppointment,
	payload: {
		...appointment
	}
});

export const removeActiveAppointment = () => ({ type: types.appointmentsRemoveActiveAppointment });

export const startUpdatingAppointment = (appointment) => {
	return async (dispatch, getState) => {

		const { patientAppointments } = getState().patients;
		const { activeDay } = getState().ui;

		const newAppointments = patientAppointments.map(
			v => v._id === appointment._id
				? appointment
				: v
		);

		if (Object.keys(activeDay).length > 0) {
			activeDay.appointments = activeDay.appointments.map(val => val._id === appointment._id ? appointment : val);
			dispatch(setActiveDay(activeDay));
		}

		const resp = await processRequest(requestTemplates.UPDATE_APPOINTMENT, appointment);
		const { ok, msg, payload: newAppointment } = await resp.json();

		if (ok) {
			dispatch(sendToast(msg, ok));
			dispatch(updateAppointments(newAppointment));
			dispatch(setPatientAppointments(newAppointments));
			dispatch(removeActiveAppointment());
		}

	};
};

export const startCancelingAppointment = (appointment) => {
	return async (dispatch, getState) => {
		const urlChangers = {
			dynamicPath: appointment?._id
		};
		const resp = await processRequest(requestTemplates.DELETE_APPOINTMENT, {}, urlChangers);
		const { ok, msg, payload: updatedAppointment } = await resp.json();
		const { activeDay } = getState().ui;
	
		activeDay.appointments = activeDay.appointments.map(
			appointment => appointment._id === updatedAppointment._id
				? updatedAppointment
				: appointment
		);

		if (ok) {
			dispatch(removeActiveAppointment());
			dispatch(sendToast(msg, ok));
			dispatch(updateAppointments(updatedAppointment));
			dispatch(setActiveDay(activeDay));
		}
	};
};

export const startAddingAppointment = (patient, schedule) => {
	return async (dispatch, getState) => {
		const resp = await processRequest(requestTemplates.CREATE_APPOINTMENT, { paciente: patient, horario: schedule });
		const { ok, msg, payload: newAppointment } = await resp.json();

		const { activeDay } = getState().ui;

		if (ok) {
			activeDay.appointments = [newAppointment, ...activeDay.appointments];
			dispatch(sendToast(msg, ok));
			dispatch(addAppointment(newAppointment));
			dispatch(setActiveDay(activeDay));
		}
	};
};

export const removeAppointments = () => ({ type: types.appointmentsRemoveAppointments });

export const startLoadingAppointments = () => {
	return async dispatch => {
		const resp = await processRequest(requestTemplates.GET_APPOINTMENTS);
		const { payload: { citas: appointments } } = await resp.json();

		appointments.length > 0
			? dispatch(setAppointments(appointments))
			: dispatch(setAppointments([]));
	};
};


