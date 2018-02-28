import * as React from 'react';
import * as ReactDOM from 'react-dom';
import history from './history';
import { Router } from 'react-router-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css';
import './index.css';

import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';

import { createStore, applyMiddleware } from 'redux';
import { Provider as ReduxProvider } from 'react-redux';
import { createEpicMiddleware } from 'redux-observable';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer, { epic as rootEpic } from './redux/modules/root';

const client = new ApolloClient({
  uri: 'https://opavthxygd.execute-api.eu-west-1.amazonaws.com/dev/graphql'
});

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
