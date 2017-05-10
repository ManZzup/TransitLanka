import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Animated,
  Button,
  ListView
} from 'react-native';

import * as Actions from '../actions/search';

import SlideUpPanel from '../components/SlideUpPanel';

var isHidden = true;

class SlideUpPanelContainer extends Component{
  constructor(props) {
    super(props);

    this.state = {
      bounceValue: new Animated.Value(200),  //This is the initial position of the subview
      buttonText: "Show Subview",
      txtInput: ""
    };

    this.selectRow = this.selectRow.bind(this);
  }

  toggleSubview() {
    var toValue = 200;

    if(isHidden) {
      toValue = 0;
    }

    Animated.spring(
      this.state.bounceValue,
      {
        toValue: toValue,
        velocity: 3,
        tension: 2,
        friction: 8,
      }
    ).start();

    isHidden = !isHidden;
  }

  showSubview(txtInput){
    if(isHidden){
      this.setState({
        txtInput: txtInput
      });

      var toValue = 0;
      Animated.spring(
        this.state.bounceValue,
        {
          toValue: toValue,
          velocity: 3,
          tension: 2,
          friction: 8,
        }
      ).start();
      isHidden = false;
    }
  }

  hideSubview(){
    if(!isHidden){
      var toValue = 200;
      Animated.spring(
        this.state.bounceValue,
        {
          toValue: toValue,
          velocity: 3,
          tension: 2,
          friction: 8,
        }
      ).start();
      isHidden = true;
    }
  }

  selectRow(location,key,input){
    this.props.actions.selectLocation(location,key,input);
    this.hideSubview();
  }

  render(){
    return(
      <SlideUpPanel bounceValue={this.state.bounceValue}
                    dataSource={this.props.locations}
                    onSelect={this.selectRow}
                    txtInput={this.state.txtInput} />
    );
  }
}


var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
function mapStateToProps(state) {
   return {
     slidingPanelUp : state.ui.slidingPanelUp,
     locations : ds.cloneWithRows(state.search.locations)
   };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(SlideUpPanelContainer);
