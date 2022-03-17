import { requestTemplates } from '../constants/HTTP';
import { processRequest } from '../services/processRequest';
import { types } from '../types/types';

const setScheduleContext = (schedules, name, date) => ({
	type: types.scheduleSetSchedulesContext,
	payload: {
		schedules: [...schedules],
		name,
		date
	}
});

const setSchedules = (schedules) => ({
	type: types.scheduleSetSchedules,
	payload: {
		schedules: [...schedules],
	}
});

export const setSelectedSchedule = ({ target }) => ({
	type: types.scheduleSetSchedule,
	payload: {
		schedule: target.value
	}
});

export const startSettingAppointmentSchedule = (_id) => {
	return async (_, getState) => {
		const { selectedSchedule } = getState().schedules;
		parseInt(selectedSchedule);

		const urlChangers = {
			dynamicPath: _id,
		};

		const resp = await processRequest(requestTemplates.SET_APPOINTMENT_SCHEDULE, { selectedSchedule }, urlChangers);
		const body = await resp.json();
		// TODO do something here
		console.log(body);
	};
};

export const startLoadingScheduleContext = (_id) => {
	return async (dispatch) => {
		const urlChangers = {
			dynamicPath: _id,
		};

		const resp = await processRequest(requestTemplates.GET_SCHEDULES, {}, urlChangers);
		const { horariosDisponibles: schedules, nombre: name, fecha: date } = await resp.json();

		schedules.length > 0
			? dispatch(setScheduleContext(schedules, name, date))
			: dispatch(setScheduleContext({}));

	};
};

export const startLoadingSchedulesByDate = (date) => {
	return async (dispatch) => {
		const urlChangers = {
			dynamicPath: encodeURIComponent(date)
		};

		const resp = await processRequest(requestTemplates.GET_SCHEDULES_BY_DATE, {}, urlChangers);
		const { ok, payload: { horariosDisponibles: availableSchedules } } = await resp.json();

		if (ok) {
			availableSchedules.sort((a, b) => a - b);
			dispatch(setSchedules(availableSchedules));
		}
	};
};