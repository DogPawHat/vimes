import { merge } from 'ramda';
import { Reducer } from 'redux';
import AuthState from './state';
import * as actionTypes from './actionTypes';
import * as stateTypes from './stateTypes';
import { isAuthAction } from './actions';

const defaultState: AuthState = {
    [stateTypes.ACCESS_TOKEN]: '',
    [stateTypes.EXPIRES_AT]: '',
    [stateTypes.ID_TOKEN]: '',
    [stateTypes.USER_ID]: ''
};

const reducer: Reducer<AuthState> = (state = defaultState, action) => {
    if (isAuthAction(action)) {
        switch (action.type) {
            case actionTypes.SET_SESSION:
                return merge(state, {
                    ...action.payload
                });
            case actionTypes.LOG_OUT:
                return merge(state, {
                    [stateTypes.ACCESS_TOKEN]: '',
                    [stateTypes.EXPIRES_AT]: '',
                    [stateTypes.ID_TOKEN]: '',
                    [stateTypes.USER_ID]: ''
                });
            default:
                return state;
        }
    }

    return state;
};

export default reducer;