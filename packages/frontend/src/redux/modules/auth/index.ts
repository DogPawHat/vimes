import reducer from './reducer';
import * as _selectors from './selectors';
import * as _actions from './actions';

export {default as state} from './state';
export {default as authEpic} from './epics';

export const actions = {
    ..._actions
};

export const selectors = {
    ..._selectors
};

export default reducer;
