import styled from "styled-components"


const Statement = () => {
	const statementsList = []

	const makeItem = (item) => {
		return (
			<></>
		)
	}

	return (
		<Container>
			{
				statementsList[0]
				? statementsList.map(makeItem)
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
	justify-content: space-between;
	border-radius: 5px;
	background-color: #FFFFFF;
`

const P = styled.p`
	font-family: Raleway;
	font-style: normal;
	font-weight: normal;
	font-size: 20px;
	line-height: 23px;
	text-align: center;
	color: #868686;
`