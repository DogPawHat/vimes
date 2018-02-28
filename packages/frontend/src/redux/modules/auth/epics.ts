import AuthState from './state';
import { Epic, EPIC_END } from 'redux-observable';
import { Action } from 'redux';
import history from '../../../history';

import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';

import * as actions from './actions';

type EpicAction = actions.AuthAction | Action;

const authEpic: Epic<EpicAction, AuthState> = action$ => 
    action$.filter(actions.isAuthAction)
        .map(action => {
            history.push('/home');
            return {
                type: EPIC_END
            };
        });

export default authEpic;