import * as React from 'react';
import { homeConnector, callbackConnecter } from './container/auth';
import { Route, Redirect, Switch } from 'react-router-dom';

import Home from './pages/Home';
import Callback from './pages/Callback';

import './App.css';

export const App: React.SFC<{}> = (props) => {

  return (
    <Switch >
      <Route 
        path="/callback" 
        component={callbackConnecter(Callback)}
      />
      <Route path="/home" component={homeConnector(Home)} />
      <Redirect to="/home" />
    </Switch>
  );
};

export default App;
