import React, { Component } from 'react';

class LayoutContainer extends Component{
  render(){
    return(
      <div>
        {this.props.children}
      </div>
    );
  }
}

export default LayoutContainer;
