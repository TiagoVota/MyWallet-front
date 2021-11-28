import { useContext, useEffect, useState } from "react"
import dayjs from 'dayjs'
import styled from "styled-components"

import UserContext from "../../contexts/UserContext"
import { getStatements } from "../../services/service.wallet"


const Statement = () => {
	const { userInfo: { token } } = useContext(UserContext)
	const [statementsInfo, setStatementsInfo] = useState({})
	
	const { statementsList, balance } = statementsInfo
	
	const isPositive = value => Boolean(value >= 0)
	const formatValue = value => Number(value).toFixed(2).replace('.', ',').replace('-', '')
	const formatDate = date => dayjs(date).format('DD/MM')

	useEffect(() => {
		if (!token) return 

		getStatements(token)
			.then(({ data }) => {setStatementsInfo(data); console.log(data)})
			.catch(error => console.log({error}))
	}, [token])

	const makeItem = ({ value, description, date }, index) => {
		return (
			<ItemContainer key={index} isPositive={isPositive(value)}>
				<div>
					<h1>{formatDate(date)}</h1>
					<h2>{description}</h2>
				</div>

				<h3>{formatValue(value)}</h3>
			</ItemContainer>
		)
	}

	return (
		<Container>
			{
				Boolean(statementsList?.[0])
					? (
						<>
							<StatementsWrapper>
								{statementsList.map(makeItem)}
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

const ItemContainer = styled.div`
	height: 35px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-family: Raleway;
	font-style: normal;
	font-weight: normal;
	font-size: 16px;
	line-height: 19px;

	div {
		display: flex;
	}

	h1 {
		color: #C6C6C6;
	}

	h2 {
		padding-left: 15px;
		color: #000000;
	}

	h3 {
		color: ${p => p.isPositive ? '#03AC00' : '#C70000'};
		text-align: right;
	}
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