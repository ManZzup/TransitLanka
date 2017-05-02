import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as API from '../actions/API';
import TrainingButton from '../components/TrainingButton';

class TrainingButtonContainer extends Component{
  render(){
    return(
      <TrainingButton onSearch={this.props.api.apiGetTrainingSet}
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


export default connect(mapStateToProps,mapDispatchToProps)(TrainingButtonContainer);
