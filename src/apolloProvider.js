import React from 'react';
import ApolloClient from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { ApolloProvider } from '@apollo/react-hooks';
import App from './App';
import LotteryContextWrapper from './context/LotteryContext';

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_BACKEND_SERVER,
});

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
});

export default (
  <ApolloProvider client={client}>
<LotteryContextWrapper>

    <App />
</LotteryContextWrapper>
  </ApolloProvider>
);
