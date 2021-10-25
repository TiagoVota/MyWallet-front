import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import UserContext from './contexts/UserContext';
import GlobalStyle from './styles/GlobalStyle';
import SignIn from './pages/signIn/SignIn';
import SignUp from './pages/signUp/SignUp';
import StatementPage from './pages/statement/index';
import NewEntry from './pages/newEntry/NewEntry';


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
					<Route path='/sign-in' exact>
						<SignIn />
					</Route>

					<Route path='/sign-up' exact>
						<SignUp />
					</Route>

					<Route path='/' exact>
						<StatementPage />
					</Route>

					<Route path='/new-entry' exact>
						<NewEntry />
					</Route>

				</Switch>
			</Router>
		</UserContext.Provider>
	)
}

export default App;