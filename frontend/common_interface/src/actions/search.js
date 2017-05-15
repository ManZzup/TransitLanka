export const SELECT_LOCATION = "SELECT_LOCATION";
export const SET_ENABLE_TRAIN = "SET_ENABLE_TRAIN";

export function selectLocation(location_name,txt_input){
  return{
    type: SELECT_LOCATION,
    location_name: location_name,
    txt_input: txt_input
  }
}
export function setUseTrains(isEnabled){
  return{
    type: SET_ENABLE_TRAIN,
    isEnabled: isEnabled
  }
}
