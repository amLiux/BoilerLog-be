import { types } from '../types/types';
import { processRequest } from '../services/processRequest';
import { sendToast, removeToast } from './ui';
import { setOnLocalStorage } from '../services/handleLocalStorage';
import { requestTemplates } from '../constants/HTTP';

export const checkingFinished = () => ({ type: types.authCheckingFinished });
export const logout = () => ({ type: types.logout });

export const login = (uid, displayName, rol) => ({
	type: types.authLogin,
	payload: {
		uid,
		displayName,
		rol
	}
});

export const startLogin = (userPayload) => {
	return async (dispatch) => {
		const resp = await processRequest(requestTemplates.LOGIN, userPayload);
		const { ok, payload: authContext, msg = '' } = await resp.json();

		if (ok) {
			setOnLocalStorage([{ name: 'token', value: authContext.token }, { name: 'token-init-date', value: new Date().getTime() }]);
			dispatch(removeToast());
			dispatch(login(authContext.uid, authContext.user, authContext.rol));
		} else {
			dispatch(sendToast(msg, ok));
		}

	};
};

export const startLogout = () => {
	return async (dispatch) => {
		localStorage.removeItem('token');
		localStorage.removeItem('token-init-date');

		dispatch(logout());
	};
};

export const startChecking = () => {
	return async (dispatch) => {
		const resp = await processRequest(requestTemplates.VALIDATE_JWT);
		const { ok, payload } = await resp.json();

		if (ok) {
			setOnLocalStorage([{ name: 'token', value: payload.token }, { name: 'token-init-date', value: new Date().getTime() }]);
			dispatch(login(payload.uid, payload.name, payload.rol));
		} else {
			dispatch(checkingFinished());
		}

	};
};