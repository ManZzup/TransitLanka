import { combineReducers } from 'redux';
import RouteEntryReducer from './routeEntry';

const rootReducer = combineReducers({
  routeEntry : RouteEntryReducer
});

export default rootReducer;
