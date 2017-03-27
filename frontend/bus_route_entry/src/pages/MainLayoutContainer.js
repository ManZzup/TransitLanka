import React, { Component } from 'react';
import '../App.css';
import '../../../libs/foundation/foundation.min.css';
require('../../../libs/foundation/jquery.js');
import { connect } from 'react-redux';

import MainLayout from './MainLayoutComponent';

window.API_BASE = "http://10.8.108.4:8080/api/";
window.API_BASE = "http://localhost:8080/api/";

class MainLayoutContainer extends Component{
  render(){
    return(
      <MainLayout children={this.props.children}
                  hasPopup={this.props.hasPopup}
                  popupType={this.props.popupType}
                  popupMsg={this.props.popupMsg} />
    );
  }
}

function mapStateToProps(state) {
   return {
      hasPopup : state.layout.hasPopup,
      popupType : state.layout.popupType,
      popupMsg: state.layout.popupMsg
   };
}

export default connect(mapStateToProps)(MainLayoutContainer);
