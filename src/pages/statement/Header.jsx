import { useContext } from 'react'
import styled from 'styled-components'

import UserContext from '../../contexts/UserContext'
import { ExitOutline } from 'react-ionicons'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'


const Header = () => {
	const { userInfo: { name }, setUserInfo } = useContext(UserContext)
	const history = useHistory()

	const logout = () => {
		localStorage.removeItem('userInfo')
		setUserInfo('')
		history.push('/sign-in')
	}

	return (
		<Container>
			<H1>Olá, {name ? name : 'Fulano'}</H1>

			<ExitButton onClick={logout}>
				<ExitOutline
					color={'#ffffff'} 
					title={'Exit Button'}
					height="30px"
					width="30px"
				/>
			</ExitButton>
		</Container>
	)
}


export default Header


const Container = styled.header`
	width: 100%;
	height: 12%;
	display: flex;
	align-items: center;
	justify-content: space-between;
`

const H1 = styled.h1`
	font-family: Raleway;
	font-style: normal;
	font-weight: bold;
	font-size: 26px;
	line-height: 31px;
	color: #FFFFFF;
`

const ExitButton = styled.button`
	width: 50px;
	height: 100%;
	display: flex;
	align-items: center;
	justify-content: end;
	background-color: inherit;
	border-width: 0px;
`
