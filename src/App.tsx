import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "./App.scss";
import Main from "./Main";
import { ApolloProvider } from "@apollo/react-hooks";
import { Provider } from "react-redux";
import store from "./renderer/redux/stores/store";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_BACKEND_SERVER,
});
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
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
