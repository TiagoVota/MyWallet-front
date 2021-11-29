import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import UserContext from './contexts/UserContext'
import GlobalStyle from './styles/GlobalStyle'
import Login from './pages/login/Login'
import SignUp from './pages/signUp/SignUp'
import StatementPage from './pages/statement/index'
import NewEntry from './pages/newEntry/NewEntry'
import NewOutflow from './pages/newOutflow/NewOutflow'


function App() {
	const [userInfo, setUserInfo] = useState({})
	const infoLocalStorage = JSON.parse(localStorage.getItem('userInfo'))

	useEffect(() => {
		if (infoLocalStorage) setUserInfo(infoLocalStorage)
	}, [userInfo.token])

	return (
		<UserContext.Provider value={{ userInfo, setUserInfo }}>
			<Router>
				<GlobalStyle />

				<Switch>
					<Route path='/login' exact component={Login}/>
					<Route path='/sign-up' exact component={SignUp}/>
					<Route path='/' exact component={StatementPage}/>
					<Route path='/new-entry' exact component={NewEntry}/>
					<Route path='/new-outflow' exact component={NewOutflow}/>
				</Switch>
			</Router>
		</UserContext.Provider>
	)
}

export default App