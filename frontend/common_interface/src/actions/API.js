import fetch from 'isomorphic-fetch';

const API_BASE = "http://localhost:8080/api/";

export const SEARCH_LOCATION = "SEARCH_LOCATION";
export const SEARCH_LOCATION_SUCCESS = "SEARCH_LOCATION_SUCCESS";
export const SEARCH_LOCATION_FAIL = "SEARCH_LOCATION_FAIL";


export function searchLocation(){
  return{
    type: SEARCH_LOCATION
  };
}

export function searchLocationSuccess(){
  return{
    type: SEARCH_LOCATION_SUCCESS
  }
}

export function searchLocationFail(){
  return{
    type: SEARCH_LOCATION_FAIL
  };
}

export function apiSearchLocation(str){
  return (dispatch) => {
    dispatch(searchLocation);

    var query = `{
      Location(search : "`+ str +`") {
        key, name
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
    })
    .catch( (error) => {
      dispatch(searchLocationFail);
    });
  };
}
