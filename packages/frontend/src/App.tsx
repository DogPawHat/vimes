import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';

import {
  getUser,
  getUserVariables
} from '@vimes/graphql/src/queries/__generated__/getUser';
import GET_USER_QUERY from '@vimes/graphql/src/queries/getUser';

import User from './components/User';
import './App.css';

console.log(GET_USER_QUERY);

const logo = require('./logo.svg');

const variables: getUserVariables = {
  id: 1
};

const renderUser = (result: QueryResult<getUser, getUserVariables>) => {
  const { data, loading, error } = result;

  if (loading) { return (<h1>Loading...</h1>); }

  if (error) { return (<h1>{error.message}</h1>); }
  
  const fullName = (
    (
      !!(data) &&
      !!(data.user)
    ) ? 
    `${data.user.firstName || ''} ${data.user.lastName || ''}` :
    ''
  );

  return (<User fullName={fullName} />);
};

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <Query 
            query={GET_USER_QUERY} 
            variables={variables} 
            children={renderUser}
        />
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
