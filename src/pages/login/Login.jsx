import { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import UserContext from '../../contexts/UserContext'
import theValidationProceeded from '../../validations/handleValidation'
import { validateLogin } from '../../validations/userValidation'
import { errorModal, successModal } from '../../factories/modalFactory'
import { postLogin } from '../../services/service.auth'


const Login = () => {
	const { setUserInfo } = useContext(UserContext)
	const history = useHistory()
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')


	const handleSubmit = (event) => {
		event.preventDefault()

		const body = {
			email: email?.toLowerCase(),
			password
		}
		
		const isValidInputs = theValidationProceeded(body, validateLogin)
		if (!isValidInputs) return

		postLogin(body)
			.then(({ data: userInfo }) => {
				successModal('Login realizado!')
				clearInputs()

				setUserInfo(userInfo)
				localStorage.setItem('userInfo', JSON.stringify(userInfo))

				redirect('/')

			}).catch(({ request: { status }}) => handleFailLogin(status))
	}

	const clearInputs = () => {
		setEmail('')
		setPassword('')
	}

	const redirect = path => history.push(path)

	const handleFailLogin = (status) => {
		const msgStatus = {
			422: 'Campo(s) inválido(s)!',
			401: 'E-mail e/ou senha incorretos(s)!',
			500: 'Erro nosso, tente novamente mais tarde, por favor 🥺'
		}

		const msgToSend = msgStatus[status] || 'Problema com o servidor 🥺'

		errorModal(msgToSend)
	}
  

	return (
		<Container>

			<H1>MyWallet</H1>

			<form onSubmit={handleSubmit}>
				<Label htmlFor='E-mail'>E-mail:</Label>
				<Input
					id='E-mail'
					placeholder='Ex: meulindoemail@email.com'
					type='email'
					onChange={({ target: { value }}) => setEmail(value)}
					value={email}
					required
				/>

				<Label htmlFor='Senha'>Senha:</Label>
				<Input
					id='Senha'
					placeholder='Ex: Senha!123'
					type='password'
					onChange={({ target: { value }}) => setPassword(value)}
					value={password}
					required
				/>

				<Button type='submit'>
					Entrar
				</Button>
			</form>

			<Link to='/sign-up'>
				<P>Primeira vez? Cadastre-se!</P>
			</Link>

		</Container>
	)
}


export default Login


const Container = styled.div`
	width: 100vw;
	height: 100vh;
	background-color: #8C11BE;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`

const H1 = styled.h1`
	margin-bottom: 24px;
	font-family: Saira Stencil One;
	font-style: normal;
	font-weight: normal;
	font-size: 32px;
	line-height: 50px;
	color: #FFFFFF;
`

const Label = styled.label`
	font-family: Raleway;
	font-style: normal;
  margin-left: 5%;
	font-style: normal;
	font-weight: normal;
	font-size: 20px;
	line-height: 24px;
	color: #FFFFFF;
`

const Input = styled.input`
	width: 88%;
	height: 58px;
	margin-left: 6%;
	margin-bottom: 13px;
	padding-left: 13px;
	font-size: 20px;
	background: #FFFFFF;
	border-radius: 5px;
	border-width: 0px;

	::placeholder {
		color: #575757;
	}

	:focus {
		color: #000000;
		outline: none;
	}
`

const Button = styled.button`
	width: 88%;
	height: 46px;
	margin-left: 6%;
	margin-bottom: 36px;
	background: #A328D6;
	border-radius: 5px;

	font-family: Raleway;
	font-style: normal;
	font-weight: bold;
	font-size: 20px;
	line-height: 23px;
	color: #FFFFFF;
`

const P = styled.p`
	font-family: Raleway;
	font-style: normal;
	font-weight: bold;
	font-size: 15px;
	line-height: 18px;
	color: #FFFFFF;
`