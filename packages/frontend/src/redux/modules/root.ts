import state from './state';
import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import auth, { authEpic, selectors as authSelectors } from './auth';

export const selectors = {
  auth: authSelectors
};

export const epic = combineEpics(
  authEpic
);

export const reducer = combineReducers<state>({
  auth
});

export {default as state} from './state';

export default reducer;