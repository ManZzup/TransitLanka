import React, { Component } from 'react';
import { connect } from 'react-redux';

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
      var title = "";
      var routes = this.props.results[i].routes;
      for(var j=0;j<routes.length;j++){
        title += (j==0) ? routes[j] : " → " + routes[j];
      }
      resultSet.push(title);
    }
    return(
      <ResultsComponent results={resultSet} />
    );
  }
}

function mapStateToProps(state) {
   return {
     results : state.search.results
   };
}

export default connect(mapStateToProps)(ResultsContainer);
