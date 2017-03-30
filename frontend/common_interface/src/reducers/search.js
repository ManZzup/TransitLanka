import {SEARCH_LOCATION_SUCCESS,FIND_PATH_SUCCESS,FIND_PATH} from '../actions/API';
import {SELECT_LOCATION} from '../actions/search';

const initialState = {
  locations : [],
  start_location : "",
  end_location : "",
  start_txt : "",
  end_txt : "",
  results : [],
  showLoading : false
};

export function search(state = initialState,action){
  switch(action.type){
    case SEARCH_LOCATION_SUCCESS:
      return {
        ...state, locations : action.locations
      };
    case SELECT_LOCATION:
      var key = "";
      for(var i=0;i<state.locations.length;i++){
        if(state.locations[i].node===action.location_name){
          key = state.locations[i].key;
          break;
        }
      }

      if(action.txt_input === "txt_start"){
        return {
          ...state, start_location : key, start_txt : action.location_name
        };
      }else{
        return {
          ...state, end_location : key, end_txt : action.location_name
        };
      }
    case FIND_PATH_SUCCESS:
      return {
        ...state, results : action.results, showLoading : false
      };
    case FIND_PATH:
      return{
        ...state, showLoading : true
      };
    default:
      return state;
  }
}

export default search;
