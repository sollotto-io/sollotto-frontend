import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Nav from "./components/Nav/";
import Purchase from "./pages/Purchase";
import Charities from "./pages/Charities";
import Suggest from "./pages/Suggest";
import Results from "./pages/Results";
import Pool from "./pages/Pool";
import PoolDetailPage from "./components/Pool/poolDetailPage";
import { GlobalContext } from "./context/GlobalContext";
function App() {
	const [globalData, setGlobalData] = useState({
		currentTicketprice: 0.01,
		holdingWalletId: "QPouV0f4tNhqDCApKgmJ",
		connectedWalletId: null,
		pools: [
			{
				PoolName: "SOLANA POOL",
				Pool: "SOL",
				PrizePool: 100.001,
				TimeRemaining: 2,
				PoolARP: "8.5ARP",
				TotalDeposit: 4444.0,
				TotalLiquidity: 24000,
				Odds: "1 in 42",
			},
			{
				PoolName: "RAYDIUM POOL",
				Pool: "RAY",
				PrizePool: 237.255,
				TimeRemaining: 10,
				PoolARP: "10.5ARP",
				TotalDeposit: 2222.3,
				TotalLiquidity: 48000,
				Odds: "1 in 67",
			},
		],
		selectedWallet: null,
		walletConnectedFlag: false,
	});
	useEffect(() => {
		if (globalData.selectedWallet) {
			globalData.selectedWallet.on("connect", () => {
				setGlobalData({ ...globalData, walletConnectedFlag: true });
				console.log(
					"Connected to wallet " +
						globalData.selectedWallet.publicKey.toBase58()
				);
			});
			globalData.selectedWallet.on("disconnect", () => {
				setGlobalData({ ...globalData, walletConnectedFlag: false });
				console.log("Disconnected from wallet");
			});
			globalData.selectedWallet.connect();
			return () => {
				globalData.selectedWallet.disconnect();
			};
		}
	}, [globalData.selectedWallet]);
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
						<Route exact path='/pools/:id'>
							<PoolDetailPage />
						</Route>
					</Switch>
				</GlobalContext.Provider>
			</Router>
		</div>
	);
}

export default App;
