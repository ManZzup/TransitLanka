const API_BASE = "http://10.0.2.2:8080/api/";
// export const API_BASE = "https://transitlanka-158812.appspot.com/api/";
const POLL_RETRY_TIMEOUT = 800;
const POLL_RETRY_COUNT = 20;
const MAX_RESULT_COUNT = 3;

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
      console.log(json);
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
  console.log(results);
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
    if(window.resultPoll){
      clearInterval(window.resultPoll);
    }

    dispatch(findPath());

    var start_node = getState().search.startLocationKey;
    var end_node = getState().search.endLocationKey;

    var query = `{
      Query(fromNode : "`+ start_node +`", toNode : "`+ end_node +`")
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
      var queryKey = json['Query'];
      window.pollCount = 0;
      window.resultPoll = setInterval(function(){
        dispatch(checkResults(queryKey));
      },POLL_RETRY_TIMEOUT);
      ;
    })
    .catch( (error) => {
      dispatch(findPathFail());
    });
  };
}

function checkResults(queryKey,cache_key){
  return (dispatch,getState) => {
    var query = `{
      QueryResults(queryKey: "` + queryKey + `"){
        key,nodes,routes,hops
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
      window.pollCount++;

      if(json['QueryResults'].length >= MAX_RESULT_COUNT){
        clearInterval(window.resultPoll);
        dispatch(findPathSuccess(json['QueryResults']));
      }else if(json['QueryResults'].length > 0){
        dispatch(findPathSuccess(json['QueryResults']));
        LocalStorage.save(cache_key,JSON.stringify(json['QueryResults']));
      }
      if(window.pollCount >= POLL_RETRY_COUNT){
        clearInterval(window.resultPoll);
        dispatch(findPathFail());
      }
    })
    .catch( (error) => {
      clearInterval(window.resultPoll);
      dispatch(findPathFail());
    });
  };
}
