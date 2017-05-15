import {SLIDING_PANEL_TOGGLE,SHOW_OVERLAY,UPDATE_CUR_SEARCH_TEXT} from '../actions/ui';

const initialState = {
  slidingPanelUp : false,
  showOverlay : false,
  curText: "",
  curInput: null
};

export function ui(state = initialState,action){
  switch(action.type){
    case SLIDING_PANEL_TOGGLE:
      return {
        ...state, slidingPanelUp : !state.slidingPanelUp
      };
    case SHOW_OVERLAY:
      return {
        ...state, showOverlay : action.show
      };
    case UPDATE_CUR_SEARCH_TEXT:
      return {
        ...state, curText : action.curText, curInput: action.curInput
      };
    default:
      return state;
  }
}

export default ui;
