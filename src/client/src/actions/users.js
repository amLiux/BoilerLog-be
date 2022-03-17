import { processRequest } from '../services/processRequest';
import { types } from '../types/types';
import { sendToast } from './ui';
import { requestTemplates } from '../constants/HTTP';

export const startLoadingUsers = () => {
	return async dispatch => {
		const response = await processRequest(requestTemplates.GET_USERS);
		const { ok, payload: users } = await response.json();

		ok && users.length > 0 ? dispatch(setUsers(users)) : dispatch(setUsers([]));
	};
};

const setUsers = (users) => ({
	type: types.usersSetUsers,
	payload: {
		users: [...users]
	}
});

export const startRegularRegister = (userPayload) => {
	return async (dispatch, getState) => {
		const resp = await processRequest(requestTemplates.REGISTER, userPayload);
		const { ok, payload: newUser, errors = [], msg } = await resp.json();

		const { totalUsers } = getState().users;

		if (ok) {
			dispatch(setUsers([...totalUsers, newUser]));
			dispatch(sendToast(msg, ok));
		} else {
			errors.length > 0
				? dispatch(sendToast(errors[Object.keys(errors)[0]].msg))
				: dispatch(sendToast(msg, ok));
		}
	};
};

export const startDisablingUser = (userId) => {
	return async (dispatch, getState) => {
		const urlChangers = {
			dynamicPath: userId,
		};

		const resp = await processRequest(requestTemplates.UPDATE_USER, {}, urlChangers);
		const { ok, msg, newUser } = await resp.json();

		let { totalUsers } = getState().users;

		if (ok) {
			totalUsers = totalUsers.map(user => user._id === newUser._id ? newUser : user);
			dispatch(setUsers(totalUsers));
			dispatch(sendToast(msg));
		}
	};
};

export const startUpdatingUser = (userId, update) => {
	return async (dispatch, getState) => {
		const urlChangers = {
			dynamicPath: userId,
		};

		const resp = await processRequest(requestTemplates.UPDATE_USER, update, urlChangers);

		const { ok, msg, newUser } = await resp.json();

		let { totalUsers } = getState().users;

		if (ok) {
			totalUsers = totalUsers.map(user => user._id === newUser._id ? newUser : user);
			dispatch(setUsers(totalUsers));
			dispatch(sendToast(msg));
		}
	};
};