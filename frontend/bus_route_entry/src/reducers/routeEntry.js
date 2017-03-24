import {SET_ROUTE_NAME,DISABLE_ROUTE_TXT,ENABLE_RECORD_ENTRIES,ADD_ROUTE,ADD_PLACE,
        REMOVE_RECORD_ENTRY, RESET_STATE} from '../actions';

const initialState = {
  routeName : "",
  routeTextDisabled : null,
  recordEntriesDisabled : "true",
  roadRoutes : [],
  roadPlaces : []
};

export function routeEntry(state = initialState,action){
  switch(action.type){
    case SET_ROUTE_NAME:
      return {
        ...state, routeName : action.routeName
      };
    case DISABLE_ROUTE_TXT:
      if(state.routeName !== ""){
        return {
          ...state, routeTextDisabled : "disabled"
        };
      }else{
        return state;
      }
    case ENABLE_RECORD_ENTRIES:
        return {
          ...state, recordEntriesDisabled : null
        };
    case ADD_ROUTE:
      var newarray = (action.id-1 === state.roadRoutes.length) ? insertItem(state.roadRoutes,action.id-1,action.route)
                                                   : updateElementInArray(state.roadRoutes, action.id-1, action.route);
      return {
        ...state, roadRoutes : newarray
      };
    case ADD_PLACE:
      let newarray = (action.id-1 === state.roadPlaces.length) ? insertItem(state.roadPlaces,action.id-1,action.place)
                                                     : updateObjectInArray(state.roadPlaces, action.id-1, action.place);
      return{
        ...state, roadPlaces : newarray
      };
    case REMOVE_RECORD_ENTRY:
      var newarray1 = removeItem(state.roadRoutes,state.roadRoutes.length-1);
      var newarray2 = removeItem(state.roadPlaces,state.roadPlaces.length-1);

      return{
        ...state, roadRoutes : newarray1, roadPlaces : newarray2
      };
    case RESET_STATE:
      return initialState;
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

export default routeEntry;
