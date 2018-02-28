import state from './state';
import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import auth, { authEpic } from './auth';

export const epic = combineEpics(
  authEpic
);

export const reducer = combineReducers<state>({
  auth
});

export {default as state} from './state';

export default reducer;