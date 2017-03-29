import React, { Component } from 'react';
import PlacesAutocomplete from '../components/PlacesAutocomplete';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as API from '../actions/API';
import * as Actions from '../actions/search';
import Awesomplete from '../libs/awesomplete.js';

class PlacesAutocompleteContainer extends Component{
  componentDidMount(){
    var input = document.getElementById(this.props.id);
    input.addEventListener('awesomplete-selectcomplete', function(e){
      this.props.actions.selectLocation(e.target.value,this.props.id);
    }.bind(this));
  }


  render(){
    if(document.getElementById(this.props.id)){
      new Awesomplete(document.getElementById(this.props.id),
                              {
                                list: this.props.locations.map( (l) => l.node),
                                minChars: 3
                              });
    }

    return(
      <PlacesAutocomplete
            label={this.props.label}
            id={this.props.id}
            placeholder={this.props.placeholder}
            onTextChange={this.props.api.apiSearchLocation}
            locations={this.props.locations}
        />
    );
  }
}

function mapStateToProps(state) {
   return {
     locations : state.search.locations
   };
}
function mapDispatchToProps(dispatch) {
  return {
    api: bindActionCreators(API, dispatch),
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesAutocompleteContainer);
