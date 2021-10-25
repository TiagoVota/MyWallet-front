import axios from 'axios'


const BASE_URL = 'http://localhost:4000'


const postSignUp = (name, email, password, confirmPassword) => {
	const body = { name, email, password, confirmPassword }

	return axios.post(`${BASE_URL}/sign-up`, body)
}

const postSignIn = (email, password) => {
	const body = { email, password }

	return axios.post(`${BASE_URL}/sign-in`, body)
}


export {
	postSignUp,
	postSignIn
}
