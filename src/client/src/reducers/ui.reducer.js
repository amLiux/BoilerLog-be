import { types } from '../types/types';

const estadoInicial = {
	isModalOpen: false,
	modalType: '',
	activeDay: {},
	isToastOpen: false,
	toastMessage: '',
	toastContext: {},
};

export const uiReducer = (state = estadoInicial, action) => {
	switch (action.type) {
		case types.uiOpenModal:
			return {
				...state,
				isModalOpen: true,
				modalType: action.payload

			};

		case types.uiCloseModal:
			return {
				...state,
				isModalOpen: false
			};

		case types.uiShowToast:
			return {
				...state,
				toastContext: action.payload,
				isToastOpen: true
			};

		case types.uiRemoveToast:
			return {
				...state,
				isToastOpen: false,
				toastMessage: ''
			};

		case types.uiSetActiveDay:
			return {
				...state,
				activeDay: action.payload
			};

		case types.uiRemoveActiveDay:
			return {
				...state,
				activeDay: {}
			};

		default:
			return state;
	}
};