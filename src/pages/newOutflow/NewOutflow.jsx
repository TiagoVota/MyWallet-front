import { useState, useContext } from 'react'
import { useHistory, Link } from 'react-router-dom'
import styled from 'styled-components'

import UserContext from '../../contexts/UserContext'
import theValidationProceeded from '../../validations/handleValidation'
import { validateTransaction } from '../../validations/transactionValidation'
import { submitTransaction } from '../../services/service.wallet'
import { errorModal, successModal } from '../../factories/modalFactory'


// const NewOutflow = () => {
// 	const { userInfo: { token } } = useContext(UserContext)
// 	const [value, setMoney] = useState('')
// 	const [description, setDescription] = useState('')
// 	const history = useHistory()

// 	const handleSubmit = (event) => {
// 		event.preventDefault()

// 		submitTransaction(token, -1 * value, description)
// 			.then(() => {
// 				setMoney('')
// 				setDescription('')
// 				history.push('/')
// 			})
// 			.catch((error) => {
// 				console.log(error)
// 				alert('Valor ou descrição inválido!')
// 			})
// 	}
	
// 	return (
// 		<Container>
// 			<Header>
// 				<Link to='/'>Nova saída</Link>
// 			</Header>

// 			<form onSubmit={handleSubmit}>
// 				<Input
// 					placeholder='Valor'
// 					type='number'
// 					onChange={({ target: { value }}) => setMoney(value)}
// 					value={value}
// 					required
// 				/>

// 				<Input
// 					placeholder='Descrição'
// 					type='text'
// 					onChange={({ target: { value }}) => setDescription(value)}
// 					value={description}
// 					required
// 				/>

// 				<Button type='submit'>
// 					Salvar saída
// 				</Button>
// 			</form>
// 		</Container>
// 	)
// }
const NewOutflow = () => {
	const { userInfo: { token } } = useContext(UserContext)
	const [value, setValue] = useState('')
	const [description, setDescription] = useState('')
	const history = useHistory()

	const handleSubmit = (event) => {
		event.preventDefault()

		const formatValue = value => Number(value.replace(',', '.'))
		
		const body = {
			value: formatValue(value),
			description,
		}

		const isValidInputs = theValidationProceeded(body, validateTransaction)
		if (!isValidInputs) return

		submitTransaction({ ...body, value: (-1) * body.value, token })
			.then(() => {
				successModal('Saída anotada!')

				clearInputs()
				history.push('/')
			}).catch(({ request: { status }}) => handleFailRegister(status))
	}

	const clearInputs = () => {
		setValue('')
		setDescription('')
	}

	const handleFailRegister = (status) => {
		const msgStatus = {
			422: 'Campo(s) inválido(s)!',
			500: 'Erro nosso, tente novamente mais tarde, por favor 🥺'
		}

		const msgToSend = msgStatus[status] || 'Problema com o servidor 🥺'

		errorModal(msgToSend)
	}
	
	return (
		<Container>
			<Header>
				<Link to='/'>Nova entrada</Link>
			</Header>

			<form onSubmit={handleSubmit}>
				<Label htmlFor='Valor'>Valor:</Label>
				<Input
					id='Valor'
					placeholder='Ex.: 42,42'
					type='text'
					onChange={({ target: { value }}) => setValue(value)}
					value={value}
					required
				/>

				<Label htmlFor='Descrição'>Descrição:</Label>
				<Input
					id='Descrição'
					placeholder='Ex.: Pagamento agiota'
					type='text'
					onChange={({ target: { value }}) => setDescription(value)}
					value={description}
					required
				/>

				<Button type='submit'>
					Salvar entrada
				</Button>
			</form>
		</Container>
	)
}

export default NewOutflow


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
