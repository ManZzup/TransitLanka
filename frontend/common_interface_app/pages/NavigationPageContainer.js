import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import NavigationView from '../components/NavigationView';

import * as API from '../actions/api';
import * as Search from '../actions/search';

class NavigationPageContainer extends Component {
  static navigationOptions = {
    title: 'Navigation'
  }
  render() {
    var routes = this.props.result.routes;
    var nodes = this.props.result.nodes;

    var title = "";
    var nodeSet = [];
    for(var j=0;j<routes.length;j++){
      title += (j===0) ? routes[j] : " → " + routes[j];
      nodeSet.push({
        route: routes[j],
        start: nodes[j],
        end: nodes[j+1]
      });
    }

    var result = {
      key: this.props.result.key,
      title: title,
      nodes: nodeSet
    }

    return (
        <NavigationView result={result}  />
    )
  }
}


function mapStateToProps(state) {
   return {
     result: state.search.selectedResult
   };
}
function mapDispatchToProps(dispatch) {
  return {
    api: bindActionCreators(API, dispatch),
    actions: bindActionCreators(Search, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(NavigationPageContainer);
