import { combineReducers } from 'redux';
import layout from './layout';
import search from './search';

const rootReducer = combineReducers({
  layout, search
});

export default rootReducer;
