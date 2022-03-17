import { types } from '../types/types';

const initialState = {
	selectedSchedule: 0,
	scheduleContext: {
		schedules: [],
		name: '',
		date: '',
	},
	schedules: [],
};

export const schedulesReducer = (state = initialState, action) => {
	switch (action.type) {
		case types.scheduleSetSchedule:
			return {
				...state,
				selectedSchedule: action.payload.horario
			};
		case types.scheduleSetSchedulesContext:
			return {
				...state,
				scheduleContext: {
					...action.payload
				}
			};
		case types.scheduleSetSchedules:
			return {
				...state,
				schedules: action.payload.schedules,
			};

		default:
			return state;
	}
};