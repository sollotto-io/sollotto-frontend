import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav/";
import Purchase from "./pages/Purchase";
import Charities from "./pages/Charities";
import Suggest from "./pages/Suggest";
import Results from "./pages/Results";
function App() {
	return (
		<div className='App'>
			<Router>
				<Nav />
				<Switch>
					<Route exact path='/purchase'>
						<Purchase />
					</Route>
					<Route exact path='/charities'>
						<Charities />
					</Route>
					<Route exact path='/suggest'>
						<Suggest />
					</Route>
					<Route exact path='/results'>
						<Results />
					</Route>
				</Switch>
			</Router>
		</div>
	);
}

export default App;
