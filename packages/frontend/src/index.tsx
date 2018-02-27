import * as React from 'react';
import * as ReactDOM from 'react-dom';
import history from './history';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

import ApolloClient from 'apollo-boost';
import * as ReactApollo from 'react-apollo';

const { ApolloProvider } = ReactApollo;

const client = new ApolloClient({
  uri: 'https://opavthxygd.execute-api.eu-west-1.amazonaws.com/dev/graphql'
});

const Index: React.SFC<{}> = () => (
  <ApolloProvider client={client}>
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </ApolloProvider>
);

ReactDOM.render(
  React.createElement(Index),
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
