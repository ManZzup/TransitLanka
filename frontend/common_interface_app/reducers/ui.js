import {SLIDING_PANEL_TOGGLE} from '../actions/ui';

const initialState = {
  slidingPanelUp : false
};

export function ui(state = initialState,action){
  switch(action.type){
    case SLIDING_PANEL_TOGGLE:
      return {
        ...state, slidingPanelUp : !state.slidingPanelUp
      };
    default:
      return state;
  }
}

export default ui;
