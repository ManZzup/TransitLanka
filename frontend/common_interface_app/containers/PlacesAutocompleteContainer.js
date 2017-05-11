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
      borderColor:'#cccccc'
    };
  }

  _searchText(){
    this.props.api.apiSearchLocation(this.state.txt);
    this.props.showPanel();
  }

  _onFocus(){
    this.props.hidePanel();
    this.setState({
      borderColor:'#1C6BA0'
    });
  }

  _onBlur(){
    this.setState({
      borderColor:'#cccccc'
    });
  }

  render() {
    return (

          <TextInput onChangeText={ (text) => {this.setState({txt:text})}}
                     value={this.state.txt}
                     returnKeyType={"search"}
                     onFocus={ () => { this._onFocus() } }
                     onBlur={ () => { this._onBlur() } }
                     onSubmitEditing={ (e) => this._searchText() }
                     underlineColorAndroid={"transparent"}
                     style={{width:'80%', borderWidth:4, borderColor:this.state.borderColor,
                             marginBottom: 10, marginTop: 10, fontSize:20, paddingLeft:15, paddingRight:15}}
                    placeholder={this.props.placeholder}
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
  },
  txtInput:{
    width:"80%",
    borderWidth:1,
    borderColor:'#cccccc'
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
