export const setOnLocalStorage = (toSet) => {

	if (!Array.isArray(toSet)) {
		toSet = [toSet];
	}

	toSet.forEach(prop => {
		try {
			localStorage.setItem(prop.name, prop.value);
		}catch(err) {
			console.error(`Error utilizando el localStorage, más detalles: ${err}`);
		}
	});
};

