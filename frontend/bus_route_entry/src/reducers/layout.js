import {SET_POPUP} from "../actions";

const initialState = {
  hasPopup : false,
  popupType : "",
  popupMsg : ""
};

export function layout(state = initialState,action){
  switch(action.type){
    case SET_POPUP:
      return {
        ...state, hasPopup: true, popupType: action.pType, popupMsg: action.msg
      };
    default:
      return state;
  }
}

export default layout;
