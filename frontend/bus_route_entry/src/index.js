import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, Link, browserHistory } from 'react-router'
import MainLayout from './MainLayout';
import VerifyData from './VerifyData';


// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );

ReactDOM.render(
  <Router history={browserHistory}>
    <Route component={MainLayout}>
      <Route path="/" component={App} />
      <Route path="/verify" component={VerifyData} />
    </Route>
  </Router>,
  document.getElementById('root')
);
