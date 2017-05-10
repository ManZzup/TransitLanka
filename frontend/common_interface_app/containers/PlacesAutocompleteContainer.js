import React, { Component } from 'react';
import { Text, StyleSheet, TouchableHighlight, View, TextInput, ListView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as API from '../actions/api';
import SlideUpPanelContainer from '../containers/SlideUpPanelContainer';

class PlacesAutocompleteContainer extends Component {
  constructor(props) {
    super(props);


    this.state = {
      txt: "",
    };
  }

  _searchText(){
    this.props.api.apiSearchLocation(this.state.txt);
    this.props.showPanel();
  }
  render() {
    return (

          <TextInput onChangeText={ (text) => {this.setState({txt:text})}}
                     value={this.state.txt}
                     style={{width:"80%"}}
                     returnKeyType={"search"}
                     onFocus={ () => this.props.hidePanel()}
                     onSubmitEditing={ (e) => this._searchText() }
                      />


    );
  }
}


var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width:'100%'
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 17,
    color: "#007AFF"
  }
});


function mapStateToProps(state) {
   return {
      
   };
}
function mapDispatchToProps(dispatch) {
  return {
    api: bindActionCreators(API, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(PlacesAutocompleteContainer);
