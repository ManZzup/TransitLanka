export const SLIDING_PANEL_TOGGLE = "SLIDING_PANEL_TOGGLE";
export const SHOW_OVERLAY = "SHOW_OVERLAY";

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
