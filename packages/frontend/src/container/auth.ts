// src/Auth/Auth.js

import * as auth0 from 'auth0-js';
import { actions } from '../redux/modules/auth';
import { connect } from 'react-redux';
import { state as RootState } from '../redux/modules/root';
import { selectors } from '../redux/modules/auth';
import { Dispatch } from 'redux';

const ACCESS_TOKEN = 'access_token';
const ID_TOKEN = 'id_token';
const EXPIRES_AT = 'expires_at';

interface VerifiedAuthResult extends auth0.Auth0DecodedHash {
  accessToken: string;
  idToken: string;
  expiresIn: number;
}

function isVerifiedAuthResult(
  result: VerifiedAuthResult | auth0.Auth0DecodedHash | undefined
): result is VerifiedAuthResult {
    return (
      !!(result) && 
      !!(result.accessToken) && 
      !!(result.idToken) && 
      !!(result.expiresIn)
    );
  }

const myAuth0 = new auth0.WebAuth({
  domain: 'dph-test-auth.eu.auth0.com',
  clientID: 'X1i2SaHPcSDDdNhwarlhFjRFWnq5WRTZ',
  redirectUri: 'http://localhost:3000/callback',
  audience: 'https://dph-test-auth.eu.auth0.com/userinfo',
  responseType: 'token id_token',
  scope: 'openid'
});

const mapStateToProps = (state: RootState) => ({
  isAuthenticated: selectors.isAuthenticated(state)
});

const mapDispatchToPropsHome = (dispatch: Dispatch<RootState>) => {
  const login = () => {
    myAuth0.authorize();
  };

  const logout = () => {
    dispatch(actions.createLogoutAction());
  };

  return {
    login,
    logout
  };
};

const mapDispatchToPropsCallback = (dispatch: Dispatch<RootState>) => {
  const setSession = (authResult: VerifiedAuthResult) => {
    // Set the time that the Access Token will expire at
    const expiresAt = JSON.stringify(
      (authResult.expiresIn * 1000) + new Date().getTime()
    );
    return dispatch(
      actions.createSetSessionAction({
        [ACCESS_TOKEN]: authResult.accessToken,
        [ID_TOKEN]: authResult.idToken,
        [EXPIRES_AT]: expiresAt
      })
    );
  };
  
  const handleAuthentication = () => {
    myAuth0.parseHash((err, authResult) => {
      if (isVerifiedAuthResult(authResult)) {
        setSession(authResult);
      } else if (err) {
        console.log(err);
      }
    });
  };

  return {
    handleAuthentication
  };
};

export const homeConnector = connect(
  mapStateToProps,
  mapDispatchToPropsHome
);

export const callbackConnecter = connect(
  mapStateToProps,
  mapDispatchToPropsCallback
);
