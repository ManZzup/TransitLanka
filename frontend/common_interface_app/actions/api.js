const API_BASE = "http://10.0.2.2:8080/api/";
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
      console.log(json);
      dispatch(searchLocationSuccess(json['Locations']));
    })
    .catch( (error) => {
      dispatch(searchLocationFail());
    });
  };
}
