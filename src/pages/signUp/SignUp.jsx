import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import styled from 'styled-components'

import theValidationProceeded from '../../validations/handleValidation'
import { validateSignUp } from '../../validations/userValidation'
import { errorModal, successModal } from '../../factories/modalFactory'
import { postSignUp } from '../../services/service.auth'


const SignUp = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('')
	const history = useHistory()


	const handleSubmit = (event) => {
		event.preventDefault()

		const body = {
			name,
			email: email?.toLowerCase(),
			password,
			repeatPassword,
		}

		const isValidInputs = theValidationProceeded(body, validateSignUp)
		if (!isValidInputs) return

		postSignUp(body)
			.then(() => {
				successModal('Cadastro realizado!')

				clearInputs()
				history.push('/login')
			}).catch(({ request: { status }}) => handleFailRegister(status))
	}

	const clearInputs = () => {
		setName('')
		setEmail('')
		setPassword('')
		setRepeatPassword('')
	}

	const handleFailRegister = (status) => {
		const msgStatus = {
			422: 'Campo(s) inválido(s)!',
			409: 'E-mail já cadastrado!',
			500: 'Erro nosso, tente novamente mais tarde, por favor 🥺'
		}

		const msgToSend = msgStatus[status] || 'Problema com o servidor 🥺'

		errorModal(msgToSend)
	}
  

	return (
		<Container>

			<H1>MyWallet</H1>

			<form onSubmit={handleSubmit}>
				<Label htmlFor='Nome'>Nome:</Label>
				<Input
					id='Nome'
					placeholder='Ex: Meu Lindo Nome'
					type='text'
					onChange={({ target: { value }}) => setName(value)}
					value={name}
					required
				/>

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
					type='text'
					onChange={({ target: { value }}) => setPassword(value)}
					value={password}
					required
				/>

				<Label htmlFor='Confirme sua senha'>Confirme sua senha:</Label>
				<Input
					id='Confirme sua senha'
					placeholder='Ex: Senha!123'
					type='text'
					onChange={({ target: { value }}) => setRepeatPassword(value)}
					value={repeatPassword}
					required
				/>

				<Button type='submit'>
					Cadastrar
				</Button>
			</form>

			<Link to='/login'>
				<P>Já tem uma conta? Entre agora!</P>
			</Link>

		</Container>
	)
}


export default SignUp


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