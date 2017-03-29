import {SEARCH_LOCATION_SUCCESS,FIND_PATH_SUCCESS,FIND_PATH} from '../actions/API';
import {SELECT_LOCATION} from '../actions/search';

const initialState = {
  locations : [],
  start_location : "",
  end_location : "",
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
          ...state, start_location : key
        };
      }else{
        return {
          ...state, end_location : key
        };
      }
    case FIND_PATH_SUCCESS:
      return {
        ...state, results : action.results
      };
    case FIND_PATH:
      console.log(action);
      return{
        ...state, showLoading : true
      };
    default:
      return state;
  }
}

function insertItem(array, id, item) {
    let newArray = array.slice();
    newArray.splice(id, 0, item);
    return newArray;
}
function removeItem(array, id) {
    let newArray = array.slice();
    newArray.splice(id, 1);
    return newArray;
}
function updateObjectInArray(array, id, actionitem) {
    return array.map( (item, index) => {
        if(index !== id) {
            return item;
        }
        return {
            ...item,
            ...actionitem
        };
    });
}
function updateElementInArray(array, id, actionitem) {
    return array.map( (item, index) => {
        if(index !== id) {
            return item;
        }
        return actionitem;
    });
}

export default search;
