export const generateUser = (name, lastName) => {
	return  `${lastName.substring(0,3)+name.substring(0,3) + Math.floor(Math.random() * 100).toString()}`;
};