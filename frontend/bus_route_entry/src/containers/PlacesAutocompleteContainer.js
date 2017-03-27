import React, { Component } from 'react';
import PlacesAutocomplete from '../components/PlacesAutocomplete';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions';

class PlacesAutocompleteContainer extends Component{
  constructor(props){
    super(props);

    this.state = {
      place: "",
      searchTxt: ""
    };

    this.onSearchInputChange = this.onSearchInputChange.bind(this)

  }
  componentDidMount(){
    var input = document.getElementById('auto_input_' + this.props.id);
    var options = {
      componentRestrictions: {country: "lk"}
    };
    var autocomplete = new window.google.maps.places.Autocomplete(input,options);
    autocomplete.addListener('place_changed', function(e) {
      console.log(autocomplete.getPlace());
      this.setState({
        searchTxt: autocomplete.getPlace().vicinity
      });

      this.props.actions.addPlace(this.props.id,autocomplete.getPlace());
    }.bind(this));
  }

  onSearchInputChange(event){
    var route = this.props.roadRoutes[this.props.id - 1];
    var txt = event.target.value;
    txt = txt.replace(route+",","");
    txt = route+"," + txt;
    this.setState({
      searchTxt: txt
    });
    window.google.maps.event.trigger( document.getElementById('auto_input_' + this.props.id), 'focus', {} );
  }

  render(){
    var auto_input_id = 'auto_input_' + this.props.id;
    return(
      <PlacesAutocomplete
            label={this.props.label}
            auto_input_id={auto_input_id}
            onSearchInputChange={this.onSearchInputChange}
            searchTxt={this.state.searchTxt}
            disabled={this.props.disabled}
        />
    );
  }
}

function mapStateToProps(state) {
   return {
     roadRoutes : state.routeEntry.roadRoutes
   };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesAutocompleteContainer);
