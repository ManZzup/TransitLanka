import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchResultPageComponent from './component';

class SearchResultPageContainer extends Component{
  render(){
    return(
      <SearchResultPageComponent
        startText={this.props.start_txt}
        endText={this.props.end_txt}
       />
    );
  }
}

function mapStateToProps(state){
  return {
    start_txt : state.search.start_txt,
    end_txt : state.search.end_txt
  }
}

export default connect(mapStateToProps)(SearchResultPageContainer);
