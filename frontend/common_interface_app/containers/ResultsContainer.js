import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Results from '../components/Results';

import * as API from '../actions/api';
import * as Search from '../actions/search';

class ResultsContainer extends Component {
  constructor(props) {
    super(props);

    this._selectPath = this._selectPath.bind(this);
  }
  _selectPath(id){
    this.props.actions.selectPath(id);
    this.props.navigate('Navigation');
  }
  render() {
    var results = [];
    for(var i=0;i<this.props.results.length;i++){
      var title = "";
      this.props.results[i].routes.forEach((n,j) => {
        title += n;
        if(j !== this.props.results[i].routes.length-1){
          title += " → ";
        }
      });
      results.push({
        id: i,
        title: title
      });
    }
    return (
        <Results results={results}
                 onPress={this._selectPath} />
    );
  }
}


function mapStateToProps(state) {
   return {
     results: state.search.results
   };
}
function mapDispatchToProps(dispatch) {
  return {
    api: bindActionCreators(API, dispatch),
    actions: bindActionCreators(Search, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ResultsContainer);
