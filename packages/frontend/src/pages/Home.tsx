import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';
import Auth from '../services/auth';

import {
  Container,
  Header
} from 'semantic-ui-react';

import GET_USER from '../queries/getUser';

import {
  getUser,
  getUserVariables
} from '../queries/__generated__/getUser';

import User from '../components/User';

const logo = require('../logo.svg');

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

const Home: React.SFC<{}> = () => (
    <Container>
    <Header>
      <img src={logo} className="App-logo" alt="logo" />
    </Header>
    <Query
      query={GET_USER}
      variables={variables}
      children={renderUser}
    />
    <p className="App-intro">
      To get started, edit <code>src/App.tsx</code> and save to reload.
    </p>
  </Container>
);

export default Home;
