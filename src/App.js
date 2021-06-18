import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { useQuery } from '@apollo/react-hooks';
import { Connection } from '@solana/web3.js';
import Nav from './components/Nav';
import Purchase from './pages/Purchase';
import Charities from './pages/Charities';
import Suggest from './pages/Suggest';
import Results from './pages/Results';
import Pool from './pages/Pool';
import CharityDetailPage from './components/Charity/CharityDetailPage';
import { GlobalContext } from './context/GlobalContext';
import { LotteryContext } from './context/LotteryContext';
import { FETCH_UPCOMING_DRAWING } from './graphql/queries';
import Loader from './components/common/Loader';
import Footer from './pages/Footer';
import ResultDetail from './components/Result/ResultDetail';
import './css/pool.css';

function App() {
  const { loading, data, refetch } = useQuery(FETCH_UPCOMING_DRAWING);
  const [globalData, setGlobalData] = useState({
    holdingWalletId: process.env.REACT_APP_HOLDING_WALLET_PK_STRING,
    charities: [],
    selectedWallet: null,
    walletConnectedFlag: false,
    connection: new Connection('https://api.devnet.solana.com'),
  });
  const [lotteryData, setLotteryData] = useState(null);
  useEffect(() => {
    if (loading === false) {
      setLotteryData(data.getActiveDrawing);
      console.log(data.getActiveDrawing)
      // setGlobalData({
      //   ...globalData,
      //   charities: charities.getAllCharities,
      // });
      if (globalData.selectedWallet) {
        globalData.selectedWallet.on('connect', () => {
          setGlobalData({ ...globalData, walletConnectedFlag: true });
        });
        globalData.selectedWallet.on('disconnect', () => {
          setGlobalData({ ...globalData, walletConnectedFlag: false });
        });
        globalData.selectedWallet.connect();
        return () => {
          globalData.selectedWallet.disconnect();
        };
      }
    }
    refetch();
  }, [globalData.selectedWallet, loading]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    console.log(loading);
    return <Loader />;
  }
  return (
    <div className="App">
      <Router>
        <GlobalContext.Provider value={{ globalData, setGlobalData }}>
          <LotteryContext.Provider value={{ lotteryData }}>
            <Nav />
            <Switch>
              {/* Redirecting to purchase page if at '/' */}
              <Route exact path="/">
                <Redirect to="/purchase" />
              </Route>
              {/* Routes  */}

              <Route exact path="/purchase">
                <Purchase />
              </Route>
              <Route exact path="/results">
                <Results />
              </Route>
              <Route exact path="/results/:id">
                <ResultDetail />
              </Route>

              <Route exact path="/charities">
                <Charities />
              </Route>
              <Route exact path="/suggest">
                <Suggest />
              </Route>
              <Route exact path="/pools">
                <Pool />
              </Route>
              <Route exact path="/charities/:id">
                <CharityDetailPage />
              </Route>
            </Switch>
            <Footer />
          </LotteryContext.Provider>
        </GlobalContext.Provider>
      </Router>
    </div>
  );
}

export default App;
