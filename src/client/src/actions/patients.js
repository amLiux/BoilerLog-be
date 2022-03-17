import { requestTemplates } from '../constants/HTTP';
import { processRequest } from '../services/processRequest';
import { types } from '../types/types';
import { startLoadingAppointments } from './appointments';
import { closeModal, sendToast } from './ui';

const setPatients = (patients) => ({
	type: types.patientsSetPatients,
	payload: {
		patients: [...patients],
	}
});

const refreshPatient = (patient) => ({
	type: types.patientsUpdatePatient,
	payload: patient
});

export const startSearchingPatient = (searchString) => {
	return async (dispatch) => {
		const urlChangers = {
			dynamicPath: searchString,
		};

		const resp = await processRequest(requestTemplates.SEARCH_PATIENT, {}, urlChangers);
		const { ok, msg, payload: { patients } } = await resp.json();

		if (ok) {
			dispatch(sendToast(msg, ok));
			dispatch(setPatients(patients));
		}

	};
};

export const startAddingPatient = (patient) => {
	return async (dispatch, getState) => {
		const { totalPatients } = getState().patients;
		const resp = await processRequest(requestTemplates.CREATE_PATIENT, patient);
		const { ok, msg, payload: createdPatient } = await resp.json();

		if (ok) {
			dispatch(sendToast(msg, ok));
			dispatch(refreshPatient(createdPatient));
			dispatch(setPatients([...totalPatients, createdPatient]));
			dispatch(removeActivePatient());
			dispatch(closeModal());
			dispatch(startLoadingAppointments());
		} else {
			// TODO do we need to handle any other error from API like this or should we do it on processResponse
			dispatch(sendToast(msg, ok));
		}

	};
};

export const clearPatients = () => ({ type: types.patientsClearPatients });

export const setPatientAppointments = (appointments) => ({
	type: types.patientsSetPatientAppointments,
	payload: appointments
});

export const setPatientFiles = (files) => ({
	type: types.patientsSetPatientFiles,
	payload: files
});

export const startLoadingPatientAppointments = (patiendId) => {
	return async (dispatch) => {
		const urlChangers = {
			dynamicPath: patiendId,
		};

		const resp = await processRequest(requestTemplates.GET_PATIENT_APPOINTMENTS, {}, urlChangers);
		const { ok, payload: { citas: appointments } } = await resp.json();

		if (ok) {
			dispatch(setPatientAppointments(appointments));
		}
	};
};

export const startLoadingPatients = () => {
	return async dispatch => {
		const resp = await processRequest(requestTemplates.GET_PATIENTS);
		const { payload: patients } = await resp.json();

		patients.length > 0 ? dispatch(setPatients(patients)) : dispatch(setPatients([]));
	};
};

export const startUpdatingPatient = (patient) => {
	return async (dispatch, getState) => {

		let { totalPatients } = getState().patients;

		totalPatients = totalPatients.map(
			v => v._id === patient._id
				? patient
				: v
		);

		const resp = await processRequest(requestTemplates.UPDATE_PATIENT, patient);
		const { ok, msg } = await resp.json();


		if (ok) {
			dispatch(sendToast(msg, ok));
			dispatch(refreshPatient(patient));
			dispatch(setPatients(totalPatients));
		}

	};
};

export const setActivePatient = (patient) => ({
	type: types.patientsSetActivePatient,
	payload: { ...patient }
});

export const removeActivePatient = () => ({ type: types.patientsRemoveActivePatient });

// TODO abstract this to its own action file
export const startLoadingPatientFiles = (patientId) => {
	return async (dispatch) => {
		const urlChangers = {
			dynamicPath: patientId
		};
		const resp = await processRequest(requestTemplates.GET_FILES, {}, urlChangers);
		const { ok, payload: { archivos:patientFiles } } = await resp.json();

		if (ok) {
			dispatch(setPatientFiles(patientFiles));
		}
	};
};

export const startUploadingFile = (file, patientId) => {
	return async (dispatch, getState) => {

		const { patientFiles } = getState().patients;
		const urlChangers = {
			dynamicPath: patientId
		};

		const data = new FormData();
		data.append('file', file);

		const resp = await processRequest(requestTemplates.UPLOAD_FILE, data, urlChangers);
		const { ok, msg, payload: userFile } = await resp.json();

		if (ok) {
			dispatch(setPatientFiles([...patientFiles, userFile]));
			dispatch(sendToast(msg, ok));
		}
	};
};

export const startDeletingFile = (fileId, fileName, patientId) => {
	return async (dispatch, getState) => {

		const urlChangers = {
			queryParams: [patientId, fileName],
		};

		const resp = await processRequest(requestTemplates.DELETE_FILE, {}, urlChangers);
		const { msg, ok } = await resp.json();

		let { patientFiles } = getState().patients;
		patientFiles = patientFiles.filter(v => v._id !== fileId);

		if (ok) {
			dispatch(sendToast(msg, ok));
			dispatch(setPatientFiles(patientFiles));
		}
	};
};

export const startDownloadingFile = (fileName, patientId) => {
	return async () => {
		const urlChangers = {
			queryParams: [patientId, fileName]
		};

		const resp = await processRequest(requestTemplates.DOWNLOAD_FILE, {}, urlChangers);
		const blob = await resp.blob();

		let url = window.URL.createObjectURL(blob);
		let a = document.createElement('a');
		a.href = url;
		a.download = fileName;
		a.click();
	};
};
