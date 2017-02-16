import React, { Component } from 'react';
import './App.css';
import '../../libs/foundation/foundation.min.css';
import '../../libs/foundation/jquery.js';
//import '../../libs/foundation/foundation.min.js';

class App extends Component {
  render() {
    return (
      <div>
        <NavigationBar title="TransitLanka">
            <NavigationBarItem class="active" text="Bus route data entry" />
        </NavigationBar>
      </div>
    );
  }
}

class NavigationBar extends Component{
  render(){
    return(
      <div className="top-bar">
        <div className="top-bar-left">
          <ul className="menu">
            <li className="menu-text">{this.props.title}</li>
            {this.props.children}
          </ul>
        </div>
      </div>
    );
  }
}

class NavigationBarItem extends Component{
  render() {
    return (
      <li className={this.props.class}><a href="#">{this.props.text}</a></li>
    );
  }
}

export default App;
