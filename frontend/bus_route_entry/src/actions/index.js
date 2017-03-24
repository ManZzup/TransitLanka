export const SET_ROUTE_NAME = "SET_ROUTE_NAME";
export const DISABLE_ROUTE_TXT =  "DISABLE_ROUTE_TXT";
export const ENABLE_RECORD_ENTRIES = "ENABLE_RECORD_ENTRIES";
export const ADD_ROUTE = "ADD_ROUTE";
export const ADD_PLACE = "ADD_PLACE";
export const REMOVE_RECORD_ENTRY = "REMOVE_RECORD_ENTRY";
export const RESET_STATE = "RESET_STATE";

export function setRouteName(name){
  return {
    type : SET_ROUTE_NAME,
    routeName : name
  };
}

export function disableRouteText(){
  return {
    type : DISABLE_ROUTE_TXT
  };
}

export function enableRecordEntries(){
  return {
    type : ENABLE_RECORD_ENTRIES
  };
}

export function addRoute(id,route){
  return {
    type : ADD_ROUTE,
    id: id,
    route: route
  };
}

export function addPlace(id,place){
  return {
    type: ADD_PLACE,
    id: id,
    place: place
  };
}

export function removeRecordEntry(){
  return {
    type: REMOVE_RECORD_ENTRY
  };
}

export function resetState(){
  return{
    type: RESET_STATE
  };
}
