import * as stateTypes from './stateTypes';

interface AuthState {
    [stateTypes.ACCESS_TOKEN]: string;
    [stateTypes.ID_TOKEN]: string;
    [stateTypes.EXPIRES_AT]: string;
    [stateTypes.USER_ID]: string;
}

export default AuthState;
