import styled from 'styled-components'

import Header from './Header'
import Statement from './Statement'
import Buttons from './Buttons'


const StatementPage = () => {
	return (
		<Container>
			<Header />

			<Statement />

			<Buttons />
		</Container>
	)
}


export default StatementPage


const Container = styled.div`
	width: 100vw;
	height: 100vh;
	padding: 0 6% 0;
	background-color: #8C11BE;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
`
