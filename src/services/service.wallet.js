import axios from 'axios'


const BASE_URL = 'http://localhost:4000'


const submitEntry = (token, value, description) => {
	const body = {
		value,
		description
	}

	return axios.post(`${BASE_URL}/entry`, body, makeConfig(token))
}

const submitOutflow = (token, value, description) => {
	const body = {
		value,
		description
	}

	return axios.post(`${BASE_URL}/outflow`, body, makeConfig(token))
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
	submitEntry,
	submitOutflow
}
