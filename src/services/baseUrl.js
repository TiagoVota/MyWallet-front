const { NODE_ENV } = process.env

const BASE_URL = (NODE_ENV === 'production')
	? 'https://my-wallet-tvc.herokuapp.com'
	: 'http://localhost:4242'


export default BASE_URL
