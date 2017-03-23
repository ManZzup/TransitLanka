import {SET_ROUTE_NAME,DISABLE_ROUTE_TXT,ENABLE_RECORD_ENTRIES,ADD_ROUTE} from '../actions';

const initialState = {
  routeName : "",
  routeTextDisabled : null,
  recordEntriesDisabled : "true",
  routes : []
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
      state.routes[action.id] = action.route;
      console.log(state.routes);
      return {
        ...state, routes : state.routes
      };
    default:
      return state;
  }
}

export default routeEntry;
