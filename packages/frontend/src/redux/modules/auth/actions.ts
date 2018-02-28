import * as actionTypes from './actionTypes';
import * as stateTypes from './stateTypes';

import { Action } from 'redux';
import { FluxStandardAction } from 'flux-standard-action';

export interface AuthProps {
  [stateTypes.ACCESS_TOKEN]: string;
  [stateTypes.ID_TOKEN]: string;
  [stateTypes.EXPIRES_AT]: string;
}

interface SetSessionAction extends FluxStandardAction<AuthProps> {
    type: typeof actionTypes.SET_SESSION;
}

interface LogOutAction extends FluxStandardAction<undefined> {
    type: typeof actionTypes.LOG_OUT;
}

interface SetSessionActionCreator {
    (payload: AuthProps): SetSessionAction;
}

interface LogOutActionCreator {
    (): LogOutAction;
}

export const createSetSessionAction: SetSessionActionCreator = (
    payload: AuthProps
) => ({
    type: actionTypes.SET_SESSION,
    payload,
    meta: undefined
});

export const createLogoutAction: LogOutActionCreator = () => ({
    type: actionTypes.LOG_OUT,
    payload: undefined,
    meta: undefined
});

export function isSetSessionAction(action: SetSessionAction | Action):
    action is SetSessionAction {
        return action.type === actionTypes.SET_SESSION;
}

export function isLogoutAction(action: LogOutAction | Action):
action is LogOutAction {
    return action.type === actionTypes.LOG_OUT;
}

export type AuthAction = 
    SetSessionAction |
    LogOutAction;

export function isAuthAction(action: AuthAction | Action):
action is AuthAction {
    return isLogoutAction(action) || isSetSessionAction(action);
}