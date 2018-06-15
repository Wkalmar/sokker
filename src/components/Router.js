import React from "react";
import history from 'utils/history.utils';
import { Router, Route, Switch, Redirect } from "react-router-dom";
// MobX
import { observer } from 'mobx-react';
// Store
import store from 'store';
// Pages
import Layout from "components/Layout.component";
import HomePage from "components/pages/HomePage.component";
import LogInPage from "components/pages/LogInPage.component";
import Page404 from "components/pages/Page404.component";


const RouteComponent = ({ component: Component, ...rest })=> {
	// Need needAuth case
	if(Component.permissions.needAuth === true && !store.authorizedUser) store.setNextPathUrl(rest.path);
	if(Component.permissions.needAuth === true && !store.authorizedUser) return <Redirect to={{ pathname: Component.permissions.redirectPath }} />;

	if(Component.permissions.notForAuth === true && store.authorizedUser) return <Redirect to={{ pathname: Component.permissions.redirectPath }} />;

	// Default case
	return (
		<Route { ...rest } render={ (props)=>
			React.createElement(Layout, props, React.createElement(Component, props))
		} />
	);
};


// @SOURCE: https://reacttraining.com/react-router/
// TODO: https://reacttraining.com/react-router/web/example/auth-workflow
const Routes = ()=> {
	return (
		<Router history={history}>
			<Switch>
				<RouteComponent exact path="/" component={HomePage} />
				<RouteComponent exact path="/login" component={LogInPage} />
				<RouteComponent component={Page404} />
			</Switch>

		</Router>
	);
}

;

export default observer(Routes);