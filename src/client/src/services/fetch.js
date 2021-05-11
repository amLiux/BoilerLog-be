// Prod
const url = `https://drsmaroto.com`

//staging
// const url = `https://boiler-log-be.herokuapp.com`

//dev
// const url = `http://localhost:3000`

export const fetchRegister = (email, pwd, name, lastName, user, admin) =>
	fetch(`${url}/new`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ email, pwd, name, lastName, user, admin })
	})

export const fetchLogin = (user, pwd) =>
	fetch(`${url}/login`, {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ user, pwd })
	})

export const fetchValidateJWT = (token) =>
	fetch(`${url}/renew`, {
		method: 'GET',
		headers: {'Authorization': token},
	})

export const fetchGetCitas = (token) =>
	fetch(`${url}/citas`, {
		method: 'GET',
		headers: {'Authorization': token},
	})

export const fetchPutCitas = (token, cita) =>
	fetch(`${url}/citas`, {
		method: 'PUT',
		headers: {
			'Authorization': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(cita)
	})

export const fetchPostCitas = (token, paciente, horario) =>
	fetch(`${url}/citas`, {
		method: 'POST',
		headers: {
			'Authorization': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({paciente, horario})
	})


export const fetchDeleteCitas = (token, id) =>
	fetch(`${url}/citas/${id}`, {
		method: 'DELETE',
		headers: {
			'Authorization': token,
		}
	})

export const fetchPostPaciente = (token, paciente) =>
	fetch(`${url}/pacientes`, {
		method: 'POST',
		headers: {
			'Authorization': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(paciente)
	})

export const fetchSearchPaciente = (token, searchString) =>
	fetch(`${url}/pacientes/search/${searchString}`, {
		method: 'GET',
		headers: {'Authorization': token}
	})

export const fetchGetPacientes = (token) =>
	fetch(`${url}/pacientes`, {
		method: 'GET',
		headers: {'Authorization': token}
	})

export const fetchGetCitasDePacientes = (token, _id) =>
	fetch(`${url}/citas/paciente/${encodeURIComponent(_id)}`, {
		method: 'GET',
		headers: {
			'Authorization': token
		}
	})

export const fetchPutPacientes = (token, paciente) =>
	fetch(`${url}/pacientes`, {
		method: 'PUT',
		headers: {
			'Authorization': token,
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(paciente)
	})

export const fetchGetHorarios = (_id) =>
	fetch(`${url}/citas/${_id}`, {method: 'GET'})

export const fetchGetHorariosByDate = (date, token) =>
	fetch(`${url}/citas/date/${encodeURIComponent(date)}`,
		{
			method: 'GET',
			headers: {
			'Authorization': token,
			'Content-Type': 'application/json'
			}

		}
		)

export const fetchPutHorarioCita = (_id, horario) =>
	fetch(`${url}/citas/${_id}`, {
			method: 'POST',
			headers: {
				'Content-Type' : 'application/json'
			},
			body: JSON.stringify({horario})
		}
	)

export const fetchPostFiles = (_id, file, token) =>
	fetch(`${url}/files/${_id}`, {
			method: 'POST',
			headers: {
				'Authorization': token,
			},
			body: file
		}
	)

export const fetchGetArchivosDePacientes = (_id, token) =>
	fetch(`${url}/files/${_id}`, {
		method: 'GET',
		headers: {'Authorization': token}
	})

export const fetchDeleteArchivo = (_id, name, token) => 
	fetch(`${url}/files/${_id}&${name}`, {
		method: 'DELETE',
		headers: {
			'Authorization': token, 
			'Content-Type': 'application/json' 
		}
	})

export const fetchDownloadArchivo = (_id, name, token) => 
	fetch(`${url}/files/${encodeURI(_id)}&${encodeURI(name)}`, {
		method: 'GET',
		headers: {
			'Authorization': token,
			'Content-Disposition': 'attachment'
		}
	})

export const fetchPostReporte = (reporte, detallesFecha, token) => 
	fetch(`${url}/reportes/${reporte}`, {
		method: 'POST',
		headers: {
			'Authorization': token,
			'Content-Type' : 'application/json'
		},
		body: JSON.stringify(detallesFecha)
	})


export const fetchGetUsers = (token) =>
	fetch(`${url}/users`, {
		method: 'GET',
		headers: {'Authorization': token}
	})

export const fetchPutUser = (token, id, update) =>
	fetch(`${url}/users/${id}`, {
		method: 'POST',
		headers: {'Authorization': token, 'Content-Type': 'application/json'},
		body: JSON.stringify(update)
	})