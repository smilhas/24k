import React, { Switch, Route} from 'react-router-dom'
import './App.css'
import SiteWrapper from './components/layout/SiteWrapper'
import {Regalos, LandingPage} from './components/sections/index'
import LandingPageDev from './components/sections/dev/LandingPageDev'
import MaintenancePage from './components/MaintenancePage'


function App(): JSX.Element {

	return (
		<SiteWrapper>
			<Switch>
				<Route exact path='/' component={LandingPage} />
				<Route exact path='/dev' component={LandingPageDev} />
				<Route exact path='/regalos' component={Regalos} />
				<Route path='/' component={MaintenancePage} />
			</Switch>
		</SiteWrapper>
	)
}

export default App