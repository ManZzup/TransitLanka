import React from 'react';

const NavigationBar = (props) => (
  <div className="top-bar">
    <div className="top-bar-left">
      <ul className="menu">
        <li className="menu-text">{props.title}</li>
        {props.children}
      </ul>
    </div>
  </div>
);

export default NavigationBar;
