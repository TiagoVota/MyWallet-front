import styled from 'styled-components'
import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { postSignUp } from '../../services/service.auth'


const SignIn = () => {
	const [name, setName] = useState('')
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [repeatPassword, setRepeatPassword] = useState('');
	const history = useHistory()


	const handleSubmit = (event) => {
		event.preventDefault()
		postSignUp(name, email, password, repeatPassword)
			.then(() => {
				alert('Cadastro realizado!')
				history.push('/sign-in')
				setName('')
				setPassword('')
				setEmail('')
				setRepeatPassword('')
			})
			.catch((error) => {
				console.log(error)
				alert('Campo inválido!')
			})
	}

	return (
		<Container>

			<H1>MyWallet</H1>

			<form onSubmit={handleSubmit}>
				<Input
					placeholder='Nome'
					type='text'
					onChange={({ target: { value }}) => setName(value)}
					value={name}
				/>

				<Input
					placeholder='E-mail'
					type='email'
					onChange={({ target: { value }}) => setEmail(value)}
					value={email}
				/>

				<Input
					placeholder='Senha'
					type='text'
					onChange={({ target: { value }}) => setPassword(value)}
					value={password}
				/>

				<Input
					placeholder='Confirme a senha'
					type='text'
					onChange={({ target: { value }}) => setRepeatPassword(value)}
					value={repeatPassword}
				/>

				<Button type='submit'>
					Cadastrar
				</Button>
			</form>

			<Link to='/sign-in'>
				<P>Já tem uma conta? Entre agora!</P>
			</Link>

		</Container>
	)
}


export default SignIn


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