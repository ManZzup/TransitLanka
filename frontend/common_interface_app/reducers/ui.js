import {SLIDING_PANEL_TOGGLE,SHOW_OVERLAY} from '../actions/ui';

const initialState = {
  slidingPanelUp : false,
  showOverlay : false
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
    default:
      return state;
  }
}

export default ui;
