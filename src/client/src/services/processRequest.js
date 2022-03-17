const url = process.env.REACT_APP_BE_URL;

const processPayload = (payload) => JSON.stringify(payload);

const processResponse = async (url, requestInfo) => {
	let resp;
	try {
		console.log(`Iniciando petición: ${url}`);
		resp = await fetch(url, requestInfo);
		return resp;
	} catch (err) {
		console.error(
			`Error executando la petición ${url}. 
			 Más detalles del error: ${err}.		`
		);

		// TODO default ok, msg for the front-end not to break if API is down
	}
};

export const processRequest = async (template, payload = {}, urlChangers = {}) => {
	const { path, headers = {}, method } = template;

	let fetchUrl = `${url}${path}`;

	let requestInfo = {
		method,
		headers
	};

	if (template.requiresAuthentication) {
		const token = localStorage.getItem('token');
		headers['Authorization'] = token;
	}

	if (template.requiresDynamicPath && Object.prototype.hasOwnProperty.call(urlChangers, 'dynamicPath')) {
		fetchUrl = `${fetchUrl}/${urlChangers.dynamicPath}`;
	}

	if (template.includesQueryParam && Object.prototype.hasOwnProperty.call(urlChangers, 'queryParams')) {
		urlChangers.queryParams.forEach((queryParam, index) => {
			if (index === 0) return fetchUrl = `${fetchUrl}/${encodeURIComponent(queryParam)}`;
			fetchUrl = `${fetchUrl}&${encodeURIComponent(queryParam)}`;
		});
	}

	const emptyPayload = Object.keys(payload).length === 0;
	const validFileUploadRequest = payload instanceof FormData && template.fileUpload;

	if (!emptyPayload) {
		requestInfo.body = processPayload(payload);
	}

	//FormData constructor cannot go through Object.keys so we skip the empty payload validation and add the body here
	if (validFileUploadRequest) {
		requestInfo.body = payload;
	}

	return processResponse(fetchUrl, requestInfo);
};
