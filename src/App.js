import React, { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import Purchase from './pages/Purchase';
import Charities from './pages/Charities';
import Suggest from './pages/Suggest';
import Results from './pages/Results';
import Pool from './pages/Pool';
import CharityDetailPage from './components/Charity/CharityDetailPage';
import { LotteryContext } from './context/LotteryContext';
import Loader from './components/common/Loader';
import Footer from './pages/Footer';
import ResultDetail from './components/Result/ResultDetail';
import './css/pool.css';
import useReduxState from './components/hooks/useReduxState';

function App() {
  const [globalData, setGlobalData] = useReduxState((state) => state.globalData);
  const { loading } = useContext(LotteryContext);

  useEffect(() => {
    if (globalData.selectedWallet) {
      globalData.selectedWallet.on('connect', () => {
        setGlobalData({ type: 'SET_GLOBAL_DATA', arg: { walletConnectedFlag: true } });
      });
      globalData.selectedWallet.on('disconnect', () => {
        setGlobalData({
          type: 'SET_GLOBAL_DATA',
          arg: { walletConnectedFlag: false, selectedWallet: null },
        });
      });
      globalData.selectedWallet.connect();
      return () => {
        globalData.selectedWallet.disconnect();
      };
    }
  }, [globalData.selectedWallet]); // eslint-disable-line react-hooks/exhaustive-deps

  if (loading) {
    return <Loader />;
  }
  return (
    <div className="App">
      <Router>
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
      </Router>
    </div>
  );
}

export default App;
