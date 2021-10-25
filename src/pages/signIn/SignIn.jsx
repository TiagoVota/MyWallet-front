import styled from 'styled-components'
import { useState, useContext } from 'react'
import { Link, useHistory } from 'react-router-dom'

import { postSignIn } from '../../services/service.auth'
import UserContext from '../../contexts/UserContext';


const SignIn = () => {
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const history = useHistory()
	const { setUserInfo } = useContext(UserContext);


	const handleSubmit = (event) => {
		event.preventDefault()
		postSignIn(email, password)
			.then(({ data: { token } }) => {
				const userInfo = {token}
				setUserInfo(userInfo)

				localStorage.setItem('userInfo', JSON.stringify(userInfo))

				history.push('/')
				setPassword('')
				setEmail('')
			})
			.catch((error) => {
				console.log(error)
				alert('E-mail ou senha inválido!')
			})
	}

	return (
		<Container>

			<H1>MyWallet</H1>

			<form onSubmit={handleSubmit}>
				<Input
					placeholder='E-mail'
					type='email'
					onChange={({ target: { value }}) => setEmail(value)}
					value={email}
				/>

				<Input
					placeholder='Senha'
					type='password'
					onChange={({ target: { value }}) => setPassword(value)}
					value={password}
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