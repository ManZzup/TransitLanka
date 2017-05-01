import fetch from 'isomorphic-fetch';
import { browserHistory }  from 'react-router'

const API_BASE = "http://localhost:8080/api/";
// export const API_BASE = "https://transitlanka-158812.appspot.com/api/";

export const SEARCH_LOCATION = "SEARCH_LOCATION";
export const SEARCH_LOCATION_SUCCESS = "SEARCH_LOCATION_SUCCESS";
export const SEARCH_LOCATION_FAIL = "SEARCH_LOCATION_FAIL";

export function searchLocation(){
  return{
    type: SEARCH_LOCATION
  };
}

export function searchLocationSuccess(locations){
  return{
    type: SEARCH_LOCATION_SUCCESS,
    locations: locations
  }
}

export function searchLocationFail(){
  return{
    type: SEARCH_LOCATION_FAIL
  };
}

export function apiSearchLocation(str){
  return (dispatch) => {
    if(str.length < 3){
      return dispatch(searchLocationFail());
    }
    dispatch(searchLocation());

    var query = `{
      Locations(search : "`+ str +`") {
        key, node
      }
    }`;

    return fetch(
          API_BASE + "query",
          {
            method: 'POST',
            body: query
          }
    )
    .then( (response) => response.json())
    .then( (json) => {
      dispatch(searchLocationSuccess(json['Locations']));
    })
    .catch( (error) => {
      dispatch(searchLocationFail());
    });
  };
}


export const FIND_PATH = "FIND_PATH";
export const FIND_PATH_SUCCESS = "FIND_PATH_SUCCESS";
export const FIND_PATH_FAIL = "FIND_PATH_FAIL";

export function findPath(){
  return{
    type: FIND_PATH
  }
}

export function findPathSuccess(results){
  browserHistory.push('/result');
  return{
    type: FIND_PATH_SUCCESS,
    results: results
  }
}

export function findPathFail(){
  console.log("TODO: failed to get path");
  return{
    type: FIND_PATH_FAIL
  }
}

export function apiFindPath(){
  return (dispatch,getState) => {
    dispatch(findPath());

    var start_node = getState().search.start_location;
    var end_node = getState().search.end_location;

    if(start_node === "" || end_node === ""){
      return dispatch(findPathFail());
    }

    var query = `{
      Query(fromNode : "`+ start_node +`", toNode : "`+ end_node +`") {
        key,routes,hops,nodes
      }
    }`;

    return fetch(
          API_BASE + "query",
          {
            method: 'POST',
            body: query
          }
    )
    .then( (response) => response.json())
    .then( (json) => {
      dispatch(findPathSuccess(json['Query']));
    })
    .catch( (error) => {
      dispatch(findPathFail());
    });
  };
}
