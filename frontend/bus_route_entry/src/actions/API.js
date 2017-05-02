import fetch from 'isomorphic-fetch';
import {setPopup,resetState} from './'

export const API_BASE = "http://localhost:8080/api/";
// export const API_BASE = "https://transitlanka-158812.appspot.com/api/";

export const SUBMIT_RECORD = "SUBMIT_RECORD";
export const SUBMIT_RECORD_SUCCESS = "SUBMIT_RECORD_SUCCESS";
export const SUBMIT_RECORD_FAIL = "SUBMIT_RECORD_FAIL";


export function submitRecord(){
  return{
    type: SUBMIT_RECORD
  };
}

export function submitRecordSuccess(){
  return{
    type: SUBMIT_RECORD_SUCCESS
  }
}

export function submitRecordFail(){
  return{
    type: SUBMIT_RECORD_FAIL
  };
}

export function apiSubmitRecord(data){
  return (dispatch) => {
    dispatch(submitRecord);
    return fetch(
          API_BASE + "interim/submit",
          {
            method: 'POST',
            body: data
          }
    )
    .then( (response) => response.json())
    .then( (json) => {
      if(json.code !== 200){
        dispatch(setPopup("FAIL",json.msg));
        return;
      }

      dispatch(setPopup("SUCCESS",json.msg));
      dispatch(resetState());
    })
    .catch( (error) => {
      dispatch(setPopup("FAIL","Error submitting record"));
    });
  };
}

export const SUBMIT_ACTION = "SUBMIT_ACTION";
export const SUBMIT_ACTION_SUCCESS = "SUBMIT_ACTION_SUCCESS";
export const SUBMIT_ACTION_FAIL = "SUBMIT_ACTION_FAIL";

export function submitAction(){
  return{
    type: SUBMIT_ACTION
  };
}

export function submitActionSuccess(){
  return{
    type: SUBMIT_ACTION_SUCCESS
  }
}

export function submitActionFail(){
  return{
    type: SUBMIT_ACTION_FAIL
  };
}

export function apiSubmitAction(route,action){
  return (dispatch) => {
    dispatch(submitRecord);

    var query = `{
      InterimAction(route : "`+ route +`",action : "`+ action +`")
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
      if(json.InterimAction !== "ok"){
        dispatch(setPopup("FAIL","Error processing request"));
        return;
      }
      dispatch(setPopup("SUCCESS","Records added successfully!"));
      window.location.reload();
    })
    .catch( (error) => {
      dispatch(setPopup("FAIL","Error processing request"));
    });
  };
}
