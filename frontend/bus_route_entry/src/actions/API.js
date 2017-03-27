import fetch from 'isomorphic-fetch';
import {setPopup,resetState} from './'

const API_BASE = "http://localhost:8080/api/";

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
