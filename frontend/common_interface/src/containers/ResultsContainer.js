import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as API from '../actions/API';
import ResultsComponent from '../components/ResultsComponent';

class ResultsContainer extends Component{
  componentDidMount(){
    if(window.$){
      window.$(document).foundation();
    }
  }
  componentDidUpdate(){
    this.componentDidMount();
  }
  render(){
    var resultSet = [];
    for(var i=0;i<this.props.results.length;i++){
      if(this.props.hasSelectedResponse){
        if(this.props.results[i].key !== this.props.selectedResponse){
          continue;
        }
      }
      var title = "";
      var nodeSet = [];
      var routes = this.props.results[i].routes;
      var nodes = this.props.results[i].nodes;

      for(var j=0;j<routes.length;j++){
        title += (j===0) ? routes[j] : " → " + routes[j];
        nodeSet.push({
          route: routes[j],
          start: nodes[j],
          end: nodes[j+1]
        });
      }

      var result = {
        key: this.props.results[i].key,
        title: title,
        nodes: nodeSet
      }
      resultSet.push(result);
    }
    console.log("change");
    console.log(this.props.hasSelectedResponse);
    return(
      <ResultsComponent results={resultSet}
                        onSelectResponse={this.props.api.apiSelectPath}
                        hasSelectedResponse={this.props.hasSelectedResponse}
                        hasTrainingSet={this.props.hasTrainingSet}  />
    );
  }
}

function mapStateToProps(state) {
   return {
     results : state.search.results,
     hasSelectedResponse: state.search.has_selected_response,
     selectedResponse: state.search.selected_response_key,
     hasTrainingSet: state.search.has_training_set
   };
}
function mapDispatchToProps(dispatch) {
  return {
    api: bindActionCreators(API, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(ResultsContainer);
