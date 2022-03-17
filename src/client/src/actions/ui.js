import { types } from '../types/types';

export const openModal = (modalType) => ({
	type: types.uiOpenModal,
	payload: modalType
});

export const sendToast = (msg, success) => ({
	type: types.uiShowToast,
	payload: {
		msg,
		success
	}
});

export const removeToast = () => ({ type: types.uiRemoveToast });

export const closeModal = () => ({ type: types.uiCloseModal });

export const setActiveDay = (day) => ({
	type: types.uiSetActiveDay,
	payload: {
		...day
	}
});

export const removeActiveDay = () => ({ type: types.uiRemoveActiveDay });

