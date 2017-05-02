import fetch from 'isomorphic-fetch';
import { browserHistory,hashHistory }  from 'react-router'

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
  console.log("dispatching");
  hashHistory.push('/result');
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

export const SELECT_PATH = "SELECT_PATH";
export const SELECT_PATH_SUCCESS = "SELECT_PATH_SUCCESS";
export const SELECT_PATH_FAIL = "SELECT_PATH_FAIL";

export function selectPath(response){
  return{
    type: SELECT_PATH,
    response: response
  }
}

export function selectPathSuccess(){
  return{
    type: SELECT_PATH_SUCCESS
  }
}

export function selectPathFail(){
  console.log("TODO: failed to get path");
  return{
    type: SELECT_PATH_FAIL
  }
}

export function apiSelectPath(responseKey){
  return (dispatch,getState) => {
    dispatch(selectPath(responseKey));

    var query = `{
            	ResponseSelection(response: "` + responseKey + `")
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
      if(json['ResponseSelection'] === 'ok'){
        dispatch(selectPathSuccess());
      }else{
        dispatch(selectPathFail());
      }
    })
    .catch( (error) => {
      dispatch(selectPathFail());
    });
  };
}

export const GET_TRAINING_SET = "GET_TRAINING_SET";
export const GET_TRAINING_SET_SUCCESS = "GET_TRAINING_SET_SUCCESS";
export const GET_TRAINING_SET_FAIL = "GET_TRAINING_SET_FAIL";

export function getTrainingSet(){
  return{
    type: GET_TRAINING_SET
  }
}

export function getTrainingSetSuccess(results){
  // browserHistory.push('/result');
  console.log(results);
  return{
    type: GET_TRAINING_SET_SUCCESS,
    results: results[0]['results'],
    start: results[0]['start'],
    end: results[0]['end']
  }
}

export function getTrainingSetFail(){
  console.log("TODO: failed to get path");
  return{
    type: GET_TRAINING_SET_FAIL
  }
}

export function apiGetTrainingSet(){
  return (dispatch,getState) => {
    dispatch(findPath());

    var query = `{
            	TrainingSet{
            		start,end,
            		results{
            			key,routes,hops,nodes
            		}
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
      dispatch(getTrainingSetSuccess(json['TrainingSet']));
    })
    .catch( (error) => {
      dispatch(getTrainingSetFail());
    });
  };
}
