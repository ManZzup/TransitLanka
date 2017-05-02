import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import TrainingPageComponent from './TrainingPageComponent';

class TrainingPageContainer extends Component{
  render(){
    return(
      <TrainingPageComponent
        startText={this.props.start_txt}
        endText={this.props.end_txt}
        hasTrainingSet={this.props.hasTrainingSet}
        startLocation={this.props.startLocation}
        endLocation={this.props.endLocation}
       />
    );
  }
}

function mapStateToProps(state){
  return {
    start_txt : state.search.start_txt,
    end_txt : state.search.end_txt,
    hasTrainingSet: state.search.has_training_set,
    startLocation : state.search.training_set_start,
    endLocation : state.search.training_set_end
  }
}

export default connect(mapStateToProps)(TrainingPageContainer);
