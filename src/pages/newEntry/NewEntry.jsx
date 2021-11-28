import { useState, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import styled from 'styled-components'

import UserContext from '../../contexts/UserContext'
import { submitTransaction } from '../../services/service.wallet'


const NewEntry = () => {
	const { userInfo: { token } } = useContext(UserContext)
	const [value, setMoney] = useState('')
	const [description, setDescription] = useState('')
	const history = useHistory()

	const handleSubmit = (event) => {
		event.preventDefault()

		submitTransaction(token, value, description)
			.then(() => {
				setMoney('')
				setDescription('')
				history.push('/')
			})
			.catch((error) => {
				console.log(error)
				alert('Valor ou descrição inválido!')
			})
	}
	
	return (
		<Container>
			<Header>
				<Link to='/'>Nova entrada</Link>
			</Header>

			<form onSubmit={handleSubmit}>
				<Input
					placeholder='Valor'
					type='number'
					onChange={({ target: { value }}) => setMoney(value)}
					value={value}
				/>

				<Input
					placeholder='Descrição'
					type='text'
					onChange={({ target: { value }}) => setDescription(value)}
					value={description}
				/>

				<Button type='submit'>
					Salvar entrada
				</Button>
			</form>
		</Container>
	)
}


export default NewEntry


const Container = styled.div`
	width: 100vw;
	height: 100vh;
	padding: 0 6% 0;
	background-color: #8C11BE;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
`

const Header = styled.header`
	width: 100%;
	height: 12%;
	margin-bottom: 3vh;
	display: flex;
	align-items: center;
	justify-content: start;
	font-family: Raleway;
	font-style: normal;
	font-weight: bold;
	font-size: 26px;
	line-height: 31px;
	color: #FFFFFF;
`

const Input = styled.input`
	width: 100%;
	height: 58px;
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
	width: 100%;
	height: 46px;
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
