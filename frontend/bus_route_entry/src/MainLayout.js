import React, { Component } from 'react';
import './App.css';
import '../../libs/foundation/foundation.min.css';
require('../../libs/foundation/jquery.js');
import $ from '../../libs/foundation/jquery.js';
// import '../../libs/foundation/foundation.min.js';
import Helmet from "react-helmet";
//import Autocomplete from 'react-google-autocomplete';
import {Link} from 'react-router'


class MainLayout extends Component{
  render(){
    return(
      <div>
        <div className="application">
            <Helmet title="TransitLanka" />
        </div>

        <NavigationBar title="TransitLanka">
            <NavigationBarItem class="active" text="Bus route data entry" link="/" />
            <NavigationBarItem text="Data verification" link="/verify" />
        </NavigationBar>

        {this.props.children}

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
      <li className={this.props.class}><Link to={this.props.link}>{this.props.text}</Link></li>
    );
  }
}

export default MainLayout;
