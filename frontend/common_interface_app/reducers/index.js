import { combineReducers } from 'redux';
import ui from './ui';
import search from './search';

const rootReducer = combineReducers({
  ui, search
});

export default rootReducer;
