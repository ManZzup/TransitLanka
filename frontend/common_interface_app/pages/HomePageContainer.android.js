import React, { Component } from 'react';
import { Text, StyleSheet, TouchableHighlight, View, TextInput, ListView } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PlacesAutocomplete from '../components/PlacesAutocomplete';
import PlacesAutocompleteContainer from '../containers/PlacesAutocompleteContainer';
import SlideUpPanelContainer from '../containers/SlideUpPanelContainer';
import SearchButtonContainer from '../containers/SearchButtonContainer';

import * as API from '../actions/api';
import * as Search from '../actions/search';

class HomePageContainer extends Component {
  static navigationOptions = {
    header: null
  }

  _showPanel(txtInput){
    this.panel.getWrappedInstance().showSubview(txtInput);
  }
  _hidePanel(){
    this.panel.getWrappedInstance().hideSubview();
  }
  render() {
    return (
        <View style={styles.container}>
          {this.props.startLocation === "" &&
            <PlacesAutocompleteContainer showPanel={ () => {this._showPanel("start")}}
                                         hidePanel={ () => {this._hidePanel()}}
                                         id="start" />
          }
          {this.props.startLocation !== "" &&
            <Text>{this.props.startLocation}</Text>
          }

          {this.props.endLocation === "" &&
            <PlacesAutocompleteContainer showPanel={ () => {this._showPanel("end")}}
                                         hidePanel={ () => {this._hidePanel()}}
                                         id="end" />
          }
          {this.props.endLocation !== "" &&
            <Text>{this.props.endLocation}</Text>
          }

          <SearchButtonContainer />

          <SlideUpPanelContainer ref={ (panel) => { this.panel = panel;} } />
        </View>
    );
  }
}

//this.panel.getWrappedInstance().toggleSubview();

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
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
     startLocation: state.search.startLocation,
     endLocation: state.search.endLocation
   };
}
function mapDispatchToProps(dispatch) {
  return {
    api: bindActionCreators(API, dispatch),
    actions: bindActionCreators(Search, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(HomePageContainer);
