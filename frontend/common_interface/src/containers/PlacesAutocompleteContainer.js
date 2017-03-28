import React, { Component } from 'react';
import PlacesAutocomplete from '../components/PlacesAutocomplete';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class PlacesAutocompleteContainer extends Component{
  componentDidMount(){
    var input = document.getElementById(this.props.id);
    input.addEventListener('awesomplete-selectcomplete', (e) =>{
      console.log(e);
    });
  }


  render(){
    return(
      <PlacesAutocomplete
            label={this.props.label}
            id={this.props.id}
            placeholder={this.props.placeholder}
        />
    );
  }
}
//
// function mapStateToProps(state) {
//    return {
//      roadRoutes : state.routeEntry.roadRoutes
//    };
// }
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators(Actions, dispatch)
//   };
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(PlacesAutocompleteContainer);
export default PlacesAutocompleteContainer;
