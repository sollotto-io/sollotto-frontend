import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Nav from './components/Nav';
import Purchase from './pages/Purchase';
import Charities from './pages/Charities';
import Suggest from './pages/Suggest';
import Results from './pages/Results';
import Pool from './pages/Pool';
import CharityDetailPage from './components/Charity/CharityDetailPage';
import Loader from './components/common/Loader';
import Footer from './pages/Footer';
import ResultDetail from './components/Result/ResultDetail';
import './css/pool.css';
import useReduxState from './components/hooks/useReduxState';
import { useQuery } from '@apollo/client';
import { FETCH_ALL_CHARITIES, FETCH_UPCOMING_DRAWING } from './graphql/queries';

function App() {
  const [globalData, setGlobalData] = useReduxState((state) => state.globalData);
  const { loading, data, refetch } = useQuery(FETCH_UPCOMING_DRAWING);
  const [, setLotteryData] = useReduxState((state) => state.lotteryData);
  const { loading: charityloading, data: charities } = useQuery(FETCH_ALL_CHARITIES);
  


  useEffect(() => {
    if (charityloading === false) {
      setGlobalData({
        type: 'SET_GLOBAL_DATA',
        arg: {
          ...globalData,
          charities: charities.getAllCharities,
        },
      });
    }
    if (!loading) {
      setLotteryData({
        type: 'SET_LOTTERY_DATA',
        arg: {
          loading,
          lotteryData: data.getActiveDrawing,
          refetch: refetch,
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading,charityloading]);

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
            <Charities charityloading={charityloading} />
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
