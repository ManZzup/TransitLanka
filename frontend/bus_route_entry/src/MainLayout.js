import React, { Component } from 'react';
import './App.css';
import '../../libs/foundation/foundation.min.css';
require('../../libs/foundation/jquery.js');
import $ from '../../libs/foundation/jquery.js';
// import '../../libs/foundation/foundation.min.js';
import Helmet from "react-helmet";
//import Autocomplete from 'react-google-autocomplete';
import {Link} from 'react-router'
import NavigationBar from './components/NavigationBar';
import NavigationBarItem from './components/NavigationBarItem';

window.API_BASE = "http://10.8.108.4:8080/api/";

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

export default MainLayout;
