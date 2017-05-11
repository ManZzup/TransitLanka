export const SELECT_LOCATION = "SELECT_LOCATION";
export const SELECT_PATH = "SELECT_PATH";
export const RESET_LOCATION = "RESET_LOCATION";

export function selectLocation(location,locationKey,txtInput){
  return{
    type: SELECT_LOCATION,
    location: location,
    locationKey: locationKey,
    txtInput: txtInput
  }
}

export function selectPath(id){
  return{
    type: SELECT_PATH,
    resultId: id
  }
}

export function resetLocation(loc){
  return{
    type: RESET_LOCATION,
    location: loc
  }
}
