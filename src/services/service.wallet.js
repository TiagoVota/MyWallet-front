import axios from 'axios'

import BASE_URL from './baseUrl'
import makeConfig from './makeConfig'


const submitTransaction = ({ token, value, description }) => {
	const body = {
		value,
		description
	}

	return axios.post(`${BASE_URL}/transaction`, body, makeConfig(token))
}


const getStatements = (token) => {
	return axios.get(`${BASE_URL}/statements`, makeConfig(token))
}


export {
	submitTransaction,
	getStatements,
}
