import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav/";
import Purchase from "./pages/Purchase";
import Charities from "./pages/Charities";
import Suggest from "./pages/Suggest";
import Results from "./pages/Results";
import Pool from './pages/Pool'
import { GlobalContext } from "./context/GlobalContext";
function App() {
	const [globalData, setGlobalData] = useState({
		currentTicketprice: 0.01,
		holdingWalletId: "QPouV0f4tNhqDCApKgmJ",
		connectedWalletId: null,
		ticketNumbers: [],
		selectedCharity: null,
		});
	return (
		<div className='App'>
			<Router>
				<GlobalContext.Provider value={{ globalData, setGlobalData }}>
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
						<Route exact path='/pools'>
							<Pool />
						</Route>
					</Switch>
				</GlobalContext.Provider>
			</Router>
		</div>
	);
}

export default App;
