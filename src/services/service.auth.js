import axios from 'axios'


const BASE_URL = 'http://localhost:4242'


const postSignUp = ({ name, email, password, repeatPassword }) => {
	const body = { name, email, password, repeatPassword }

	return axios.post(`${BASE_URL}/sign-up`, body)
}

const postLogin = ({ email, password }) => {
	const body = { email, password }

	return axios.post(`${BASE_URL}/login`, body)
}


export {
	postSignUp,
	postLogin
}
