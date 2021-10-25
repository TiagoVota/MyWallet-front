import axios from 'axios'


const BASE_URL = 'http://localhost:4000'


const submitEntry = (value, description) => {
	const body = {
		value,
		description
	}

	return axios.post(`${BASE_URL}/entry`, body)
}


export {
	submitEntry
}
