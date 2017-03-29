export const SELECT_LOCATION = "SELECT_LOCATION";

export function selectLocation(location_name,txt_input){
  return{
    type: SELECT_LOCATION,
    location_name: location_name,
    txt_input: txt_input
  }
}
