export const SLIDING_PANEL_TOGGLE = "SLIDING_PANEL_TOGGLE";
export const SHOW_OVERLAY = "SHOW_OVERLAY";
export const UPDATE_CUR_SEARCH_TEXT = "UPDATE_CUR_SEARCH_TEXT";

export function togglePanel(){
  return{
    type: SLIDING_PANEL_TOGGLE
  }
}

export function showOverlay(show){
  return{
    type: SHOW_OVERLAY,
    show: show
  }
}

export function updateCurText(txt,inp){
  return{
    type: UPDATE_CUR_SEARCH_TEXT,
    curText: txt,
    curInput: inp
  }
}
