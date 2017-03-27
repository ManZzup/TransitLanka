import { combineReducers } from 'redux';
import routeEntry from './routeEntry';
import layout from './layout';

const rootReducer = combineReducers({
  layout,routeEntry
});

export default rootReducer;
