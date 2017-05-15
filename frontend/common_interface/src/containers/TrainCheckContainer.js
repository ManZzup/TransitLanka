import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TrainCheck from '../components/TrainCheck';
import * as Actions from '../actions/search';

class TrainCheckContainer extends Component{
  render(){

    return(
      <TrainCheck enableTrains={this.props.enableTrains}
                  onChange={this.props.actions.setUseTrains}  />
    );
  }
}

function mapStateToProps(state) {
   return {
     enableTrains: state.search.enableTrains
   };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(Actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(TrainCheckContainer);
