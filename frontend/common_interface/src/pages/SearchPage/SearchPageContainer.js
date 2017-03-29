import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SearchPageComponent from './component';
import * as API from '../../actions/API';

class SearchPageContainer extends Component{
  render(){
    return(
      <SearchPageComponent />
    );
  }
}

function mapStateToProps(state){
  return {

  }
}
function mapDispatchToProps(dispatch) {
  return {
    api: bindActionCreators(API, dispatch)
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchPageContainer);
