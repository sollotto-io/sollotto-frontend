import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import "./App.scss";
import Main from "./Main";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from "react-redux";
import store from "./renderer/redux/stores/store";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_BACKEND_SERVER,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

function App(): JSX.Element {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <Main />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
