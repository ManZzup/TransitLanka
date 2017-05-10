export const SELECT_LOCATION = "SELECT_LOCATION";

export function selectLocation(location,locationKey,txtInput){
  return{
    type: SELECT_LOCATION,
    location: location,
    locationKey: locationKey,
    txtInput: txtInput
  }
}
