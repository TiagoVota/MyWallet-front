import { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import styled from 'styled-components'

import UserContext from '../../contexts/UserContext'
import { errorModal } from '../../factories/modalFactory'
import { getStatements } from '../../services/service.wallet'

import Item from './Item'


const Statement = () => {
	const { userInfo: { token } } = useContext(UserContext)
	const [statementsInfo, setStatementsInfo] = useState({})
	const history = useHistory()
	
	const { transactionsList, balance } = statementsInfo
	
	const isPositive = value => Boolean(value >= 0)
	const formatValue = (value) => {
		return Number(value).toFixed(2).replace('.', ',').replace('-', '')
	}

	useEffect(() => {
		if (!token) return 

		getStatements(token)
			.then(({ data }) => setStatementsInfo(data))
			.catch(({ request: { status }}) => handleFailGetTransaction(status))
	}, [token])

	const handleFailGetTransaction = (status) => {
		const msgStatus = {
			401: 'Não autorizado!',
			500: 'Erro nosso, tente novamente mais tarde, por favor 🥺'
		}

		const msgToSend = msgStatus[status] || 'Problema com o servidor 🥺'

		errorModal(msgToSend)

		redirect('/login')
	}

	const redirect = path => history.push(path)

	const makeItem = ({ value, description, date }, index) => {
		return (
			<Item
				key={index}
				value={value}
				description={description}
				date={date}
				isPositive={isPositive(value)}
				formatValue={formatValue}
			/>
		)
	}

	return (
		<Container>
			{
				transactionsList?.[0]
					? (
						<>
							<StatementsWrapper>
								{transactionsList.map(makeItem)}
							</StatementsWrapper>

							<BalanceBox isPositive={isPositive(balance)}>
								<h1>SALDO</h1>
								<h2>{formatValue(balance)}</h2>
							</BalanceBox>
						</>
					)
					: <P>Não há registros de<br/>entrada ou saída</P>
			}

		</Container>
	)
}


export default Statement


const Container = styled.div`
	width: 100%;
	height: calc(100% - 20% - 12%);
	padding: 23px 11px 10px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	border-radius: 5px;
	background-color: #FFFFFF;
`

const StatementsWrapper = styled.div`
	height: calc(100% - 30px);
	overflow-y: scroll;
`



const P = styled.p`
	top: 50%;
	font-family: Raleway;
	font-style: normal;
	font-weight: normal;
	font-size: 20px;
	line-height: 23px;
	text-align: center;
	color: #868686;
`

const BalanceBox = styled.div`
	height: 30px;
	display: flex;
	justify-content: space-between;
	align-items: center;

	font-family: Raleway;
	font-style: normal;
	font-size: 17px;
	line-height: 20px;
	
	h1 {
		font-weight: bold;
		color: #000000;
	}

	h2 {
		font-weight: normal;
		color: ${p => p.isPositive ? '#03AC00' : '#C70000'};
	}
`