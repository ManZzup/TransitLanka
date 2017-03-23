import React from 'react';
import {Link} from 'react-router'

const NavigationBarItem = (props) => (
  <li className={props.class}><Link to={props.link}>{props.text}</Link></li>
);

export default NavigationBarItem;
