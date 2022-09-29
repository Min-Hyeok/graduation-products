import { AnyAction, combineReducers } from 'redux';
import { HYDRATE } from 'next-redux-wrapper';
import counter from '@store/modules/counterSlice';
import setting from '@store/modules/settingSlice';

const reducer = combineReducers({
  counter,
  setting,
});

const rootReducer = (
  state: ReturnType<typeof reducer> | undefined,
  action: AnyAction,
) => (action.type === HYDRATE
  ? { ...state, ...action.payload }
  : reducer(state, action));

export default rootReducer;
