import {SEARCH_LOCATION_SUCCESS,
        FIND_PATH_SUCCESS,FIND_PATH,FIND_PATH_FAIL,
        GET_TRAINING_SET,GET_TRAINING_SET_SUCCESS,
        SELECT_PATH} from '../actions/API';
import {SELECT_LOCATION,SET_ENABLE_TRAIN} from '../actions/search';

const initialState = {
  locations : [],
  start_location : "",
  end_location : "",
  start_txt : "",
  end_txt : "",
  results : [],
  showLoading : false,
  has_training_set : false,
  training_set_start : "",
  training_set_end : "",
  has_selected_response : false,
  selected_response_key : "",
  enableTrains : true
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
    case FIND_PATH_FAIL:
      return {
        ...state, results : [], showLoading : false
      };
    case FIND_PATH:
      return{
        ...state, showLoading : true, results: [], has_selected_response: false
      };
    case GET_TRAINING_SET_SUCCESS:
      return {
        ...state, results : action.results, showLoading : false,
                  training_set_start: action.start, training_set_end : action.end, has_training_set : true,
                  has_selected_response: false
      };
    case GET_TRAINING_SET:
      return{
        ...state, showLoading : true, has_selected_response: false
      };
    case SELECT_PATH:
      return{
        ...state, has_selected_response: true, selected_response_key:action.response
      };
    case SET_ENABLE_TRAIN:
      return{
        ...state, enableTrains: action.isEnabled
      };
    default:
      return state;
  }
}

export default search;
