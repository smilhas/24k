import React, { Switch, Route, Redirect} from 'react-router-dom'
import './App.css'
import SiteWrapper from './components/layout/SiteWrapper'
import {Regalos, LandingPage, LandingPageDev} from './components/sections/index'
import MaintenancePage from './components/MaintenancePage'

function App(): JSX.Element {
	return (
		<Switch>
			<Route exact path='/not-found' component={MaintenancePage} />
			<SiteWrapper>
				<Switch>
					<Route exact path='/' component={LandingPage}/>
					<Route exact path='/dev' component={LandingPageDev} />
					<Route exact path='/test' component={Regalos} />
					<Redirect to='/not-found' />
				</Switch>
			</SiteWrapper>
		</Switch>
	)
}

export default App