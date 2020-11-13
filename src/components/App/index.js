import React from 'react';
import { BrowserRouter as Router,
	Route}
	from 'react-router-dom';
//import Container from 'muicss/lib/react/container'

import Navigation from '../Navigation'
import LandingPage from '../Landing'
import HomePage from '../Home'
import SignInPage from '../SignIn'
import AdminPage from '../Admin'
import { withAuthentication } from '../Session'

import * as ROUTES from '../../constants/routes'

const App = () => (
	<Router>
		<div>
			<Navigation/>

			<hr />

			<Route exact path={ROUTES.LANDING} component={LandingPage} />
			<Route path={ROUTES.HOME} component={HomePage} />
			<Route path={ROUTES.SIGN_IN} component={SignInPage} />
			<Route path={ROUTES.ADMIN} component={AdminPage} />

		</div>
	</Router>
);

export default withAuthentication(App);