import axios from 'axios'


const BASE_URL = 'http://localhost:4000'


const submitTransaction = (token, value, description) => {
	const body = {
		value,
		description
	}

	return axios.post(`${BASE_URL}/transaction`, body, makeConfig(token))
}


const getStatements = (token) => {
	return axios.get(`${BASE_URL}/statement`, makeConfig(token))
}

const makeConfig = (token) => {
	const config = {
		headers: {
			'Authorization': `Bearer ${token}`
		}
	};
	
	return config;
};


export {
	submitTransaction,
	getStatements,
}
