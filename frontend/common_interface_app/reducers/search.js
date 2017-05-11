import {SEARCH_LOCATION_SUCCESS,FIND_PATH_SUCCESS,SEARCH_LOCATION,FIND_PATH} from '../actions/api';
import {SELECT_LOCATION,SELECT_PATH,RESET_LOCATION} from '../actions/search';

const initialState = {
  locations : [],
  startLocation : "",
  startLocationKey: "",
  endLocation : "",
  endLocationKey: "",
  results: [],
  selectedResult: ""
};

export function search(state = initialState,action){
  switch(action.type){
    case SEARCH_LOCATION:
      return {
        ...state, locations : []
      };
    case SEARCH_LOCATION_SUCCESS:
      return {
        ...state, locations : action.locations
      };
    case SELECT_LOCATION:
      if(action.txtInput === "start"){
        return {
          ...state, startLocation : action.location, startLocationKey: action.locationKey
        };
      }else if(action.txtInput === "end"){
        return {
          ...state, endLocation : action.location, endLocationKey: action.locationKey
        };
      }
    case FIND_PATH:
      return {
        ...state, results : []
      };
    case FIND_PATH_SUCCESS:
      return {
        ...state, results : action.results
      };
    case SELECT_PATH:
      console.log(action);
      return {
        ...state, selectedResult : state.results[action.resultId]
      };
    case RESET_LOCATION:
      if(action.location === "start"){
        return {
          ...state, startLocation : "", startLocationKey: ""
        };
      }else if(action.location === "end"){
        return {
          ...state, endLocation : "", endLocationKey: ""
        };
      }
    default:
      return state;
  }
}

export default search;
