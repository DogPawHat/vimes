import React from 'react';
import { Query, QueryResult } from 'react-apollo';
import { getUser, getUserVariables } from 
  '../../graphql/queries/__generated__/getUser';
import User from './components/User';
import GET_USER_QUERY from '../../graphql/queries/getUser.graphql';
import './App.css';

const logo = require('./logo.svg');

const varables: getUserVariables = {
  id: 1
};

const renderUser = (result: QueryResult<getUser, getUserVariables>) => {
  const { data, loading, error } = result;
  
  const fullName = (
    (
      !(loading) && 
      !(error) &&
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
          <Query 
            query={GET_USER_QUERY} 
            variables={varables} 
            children={renderUser}
          />
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
