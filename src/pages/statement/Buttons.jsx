import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import { AddCircleOutline, RemoveCircleOutline } from 'react-ionicons'


const Buttons = () => {
	const history = useHistory()

	const redirect = (path) => {
		history.push(path)
	}

	return (
		<Container>
			<ButtonBox onClick={() => redirect('/new-entry')}>
				<AddCircleOutline
					color={'#FFFFFF'} 
					title={'New entry icon'}
					height="25px"
					width="25px"
				/>
				
				<P>Nova entrada</P>
			</ButtonBox>

			<ButtonBox onClick={() => redirect('/new-outflow')}>
				<RemoveCircleOutline
					color={'#FFFFFF'} 
					title={'New outflow icon'}
					height="25px"
					width="25px"
				/>

				<P>Nova saída</P>
			</ButtonBox>

		</Container>
	)
}


export default Buttons


const Container = styled.div`
	width: 100%;
	height: 20%;
	padding: 13px 0 13px;
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const ButtonBox = styled.button`
	width: 48%;
	height: 100%;
	padding: 9px;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	background: #A328D6;
	border-radius: 5px;
	border-width: 0px;
`

const P = styled.p`
	font-family: Raleway;
	font-style: normal;
	font-weight: bold;
	font-size: 17px;
	line-height: 20px;
	color: #FFFFFF;
`
