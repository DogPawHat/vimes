import * as React from 'react';
import * as ReactDOM from 'react-dom';
import history from './history';
import { Router } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import { InMemoryCache } from 'apollo-cache-inmemory';

import { ApolloProvider } from 'react-apollo';

import { createStore, applyMiddleware } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer, { epic as rootEpic, selectors } from './redux/modules/root';

// Configure Redux
const epicMiddleware = createEpicMiddleware(
  rootEpic
);

const composeEnhancers = composeWithDevTools({});

const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(epicMiddleware)
  )
);

// Configure Apollo
const httpLink = createHttpLink({
  uri: 'https://opavthxygd.execute-api.eu-west-1.amazonaws.com/dev/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = selectors.auth.getToken(store.getState());

  return {
    headers: {
      ...headers,
      'Authorization': token ? `Bearer ${token}` : '',
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

const Index: React.SFC<{}> = () => (
  <ReduxProvider store={store}>
    <ApolloProvider client={client}>
      <Router history={history}>
        <App />
      </Router>
    </ApolloProvider>
  </ReduxProvider>
);

ReactDOM.render(
  React.createElement(Index),
  document.getElementById('root') as HTMLElement
);
registerServiceWorker();
