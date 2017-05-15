import React, { Component } from 'react';
import { Text, StyleSheet, TouchableHighlight, View, TextInput, ListView, Keyboard } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import PlacesAutocomplete from '../components/PlacesAutocomplete';
import PlacesAutocompleteContainer from '../containers/PlacesAutocompleteContainer';
import SlideUpPanelContainer from '../containers/SlideUpPanelContainer';
import SearchButtonContainer from '../containers/SearchButtonContainer';
import SelectedPlace from '../components/SelectedPlace';
import SearchLocationButtonContainer from '../containers/SearchLocationButtonContainer';

import * as API from '../actions/api';
import * as Search from '../actions/search';
import * as UI from '../actions/ui';

class HomePageContainer extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props){
    super(props);

    this.state = {
      showLocSearch: false
    };
  }

  _showPanel(txtInput){
    this.panel.getWrappedInstance().showSubview(txtInput);
    this._hideSearchButton();
  }
  _hidePanel(){
    this.panel.getWrappedInstance().hideSubview();
  }

  _doSearch(){
    this.props.api.apiFindPath();
    this.props.navigation.navigate('Result');
  }

  _resetLocation(loc){
    this.props.actions.resetLocation(loc);
  }

  _showSearchButton(){
    this.setState({
      showLocSearch : true
    });
  }

  _hideSearchButton(){
    this.setState({
      showLocSearch : false
    });
  }

  _searchLocation(){
    Keyboard.dismiss();
    this.props.api.apiSearchLocation(this.props.curText);
    this._showPanel(this.props.curInput);
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
        <View style={styles.container}>
          <View style={styles.container2}>
            <Text style={styles.logo_text_1}>transit</Text><Text style={styles.logo_text_2}>Lanka</Text>
          </View>
          {this.props.startLocation === "" &&
            <PlacesAutocompleteContainer showPanel={ () => {this._showPanel("start")}}
                                         hidePanel={ () => {this._hidePanel()}}
                                         placeholder={"Where are you?"}
                                         id="start"
                                         showLocSearch={ () => {this._showSearchButton()}} />
          }
          {this.props.startLocation !== "" &&
            <SelectedPlace place={this.props.startLocation} onPress={() => { this._resetLocation("start") }}></SelectedPlace>
          }

          {this.props.endLocation === "" &&
            <PlacesAutocompleteContainer showPanel={ () => {this._showPanel("end")}}
                                         hidePanel={ () => {this._hidePanel()}}
                                         placeholder={"Where are you going?"}
                                         id="end"
                                         showLocSearch={ () => {this._showSearchButton()}} />
          }
          {this.props.endLocation !== "" &&
            <SelectedPlace place={this.props.endLocation} onPress={() => { this._resetLocation("end") }}></SelectedPlace>
          }

          { this.state.showLocSearch &&
              <SearchLocationButtonContainer onPress={ () => { this._searchLocation()} } />
          }
          { !this.state.showLocSearch &&
            (this.props.startLocation !== "" && this.props.endLocation !== "") &&
              <SearchButtonContainer onPress={ () => { this._doSearch()} } />

          }

          {this.props.showOverlay &&
              <View style={styles.overlay}></View>
          }
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
  container2: {
    flexDirection:'row'
  },
  button: {
    padding: 8,
  },
  buttonText: {
    fontSize: 17,
    color: "#007AFF"
  },
  logo_text_1:{
    fontSize:30,
    color:'#1C6BA0'
  },
  logo_text_2:{
    fontSize:30,
    color:'#ffae00'
  },
  overlay:{
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0,0,0,0.5)'
  }
});


function mapStateToProps(state) {
   return {
     startLocation: state.search.startLocation,
     endLocation: state.search.endLocation,
     showOverlay: state.ui.showOverlay,
     curText: state.ui.curText,
     curInput: state.ui.curInput
   };
}
function mapDispatchToProps(dispatch) {
  return {
    api: bindActionCreators(API, dispatch),
    actions: bindActionCreators(Search, dispatch),
    ui: bindActionCreators(UI, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(HomePageContainer);
