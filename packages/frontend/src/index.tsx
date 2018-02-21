import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

const client = new ApolloClient({
  uri: 'https://opavthxygd.execute-api.eu-west-1.amazonaws.com/dev/graphql'
});

const renderProd = (
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
);

ReactDOM.render(
  renderProd,
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
