import React, { useState, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";
import Nav from "./components/Nav/";
import Purchase from "./pages/Purchase";
import Charities from "./pages/Charities";
import Suggest from "./pages/Suggest";
import Results from "./pages/Results";
import Pool from "./pages/Pool";
import CharityDetailPage from "./components/charity/charityDetailPage";
import { GlobalContext } from "./context/GlobalContext";
import { useQuery } from "@apollo/react-hooks";
import { FETCH_ALL_CHARITIES, FETCH_UPCOMING_LOTTERY } from "./graphql/queries";
import Loader from "./components/common/Loader";
import Footer from "./pages/Footer";
import { Connection } from "@solana/web3.js";
import ResultDetail from "./components/Result/ResultDetail";
import "./css/pool.css";
function App() {
	const { loading, data } = useQuery(FETCH_UPCOMING_LOTTERY);
	const { loading: charityloading, data: charities } =
		useQuery(FETCH_ALL_CHARITIES);

	const [globalData, setGlobalData] = useState({
		holdingWalletId: "86qYQ2wXLAKiD9S7qGnCd92UBEh5GWUDHwa39ifH7RJJ",
		currentLottery: {},
		charities: [],
		selectedWallet: null,
		walletConnectedFlag: false,
		connection: new Connection(" https://api.devnet.solana.com"),
	});
	useEffect(() => {
		if (globalData.selectedWallet) {
			globalData.selectedWallet.on("connect", () => {
				setGlobalData({ ...globalData, walletConnectedFlag: true });
			});
			globalData.selectedWallet.on("disconnect", () => {
				setGlobalData({ ...globalData, walletConnectedFlag: false });
			});
			globalData.selectedWallet.connect();
			return () => {
				globalData.selectedWallet.disconnect();
			};
		}
		if (loading === false && charityloading === false) {
			setGlobalData({
				...globalData,
				currentLottery: data.getupcomingLottery,
				charities: charities.getAllCharities,
			});
		}
	}, [globalData.selectedWallet, loading, charityloading]); // eslint-disable-line react-hooks/exhaustive-deps

	if (loading) {
		return <Loader />;
	}
	return (
		<div className='App'>
			<Router>
				<GlobalContext.Provider value={{ globalData, setGlobalData }}>
					<Nav />
					<Switch>
						<Route exact path='/'>
							<Redirect to='/purchase' />
						</Route>
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
						{/* <Route exact path='/pools'>
							<Pool />
						</Route>
						<Route exact path='/pools/:id'>
							<PoolDetailPage />
						</Route> */}
						<Route exact path='/charities/:id'>
							<CharityDetailPage />
						</Route>
						<Route exact path='/results/:id'>
							<ResultDetail />
						</Route>
					</Switch>
					<Footer />
				</GlobalContext.Provider>
			</Router>
		</div>
	);
}

export default App;
