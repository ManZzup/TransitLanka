import {SEARCH_LOCATION_SUCCESS} from '../actions/api';
import {SELECT_LOCATION} from '../actions/search';

const initialState = {
  locations : [],
  startLocation : "",
  startLocationKey: "",
  endLocation : "",
  endLocationKey: ""
};

export function search(state = initialState,action){
  switch(action.type){
    case SEARCH_LOCATION_SUCCESS:
      return {
        ...state, locations : action.locations
      };
    case SELECT_LOCATION:
    console.log(action);
      if(action.txtInput === "start"){
        return {
          ...state, startLocation : action.location, startLocationKey: action.locationKey
        };
      }else if(action.txtInput === "end"){
        return {
          ...state, endLocation : action.location, endLocationKey: action.locationKey
        };
      }
    default:
      return state;
  }
}

export default search;
