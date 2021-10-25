import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import UserContext from './contexts/UserContext';
import GlobalStyle from './styles/GlobalStyle';
import SignIn from './pages/signIn/SignIn';


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
					<Route path='/login' exact>
						<SignIn />
					</Route>

				</Switch>
			</Router>
		</UserContext.Provider>
	)
}

export default App;