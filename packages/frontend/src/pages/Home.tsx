import * as React from 'react';
import { Query, QueryResult } from 'react-apollo';

import {
  Container,
  Header,
  Button
} from 'semantic-ui-react';

import GET_USER from '../queries/getUser';

import {
  getUser,
  getUserVariables
} from '../queries/__generated__/getUser';

import User from '../components/User';

const logo = require('../logo.svg');

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

const Home: React.SFC<{
  login: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  userId: string;
}> = ({login, logout, isAuthenticated, userId}) => (
  <Container>
    <Header>
      <img src={logo} className="App-logo" alt="logo" />
    </Header>
    {
      !isAuthenticated ?
      (
        <Button onClick={login}>Login</Button>
      ) :
      (
        <>
        <Query
          query={GET_USER}
          variables={{id: userId}}
          children={renderUser}
        />
        <Button onClick={logout}>Logout</Button>
        </>
      )
    }

    <p className="App-intro">
      To get started, edit <code>src/App.tsx</code> and save to reload.
    </p>
  </Container>
);

export default Home;
