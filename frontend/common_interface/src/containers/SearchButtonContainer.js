import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as API from '../actions/API';
import SearchButton from '../components/SearchButton';

class SearchButtonContainer extends Component{
  render(){
    return(
      <SearchButton onSearch={this.props.api.apiFindPath}
                    loadButton={this.props.showLoadButton} />
    );
  }
}

function mapStateToProps(state) {
   return {
     showLoadButton : state.search.showLoading
   };
}
function mapDispatchToProps(dispatch) {
  return {
    api: bindActionCreators(API, dispatch)
  };
}


export default connect(mapStateToProps,mapDispatchToProps)(SearchButtonContainer);
