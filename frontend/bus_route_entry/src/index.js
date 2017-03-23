import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, browserHistory } from 'react-router'
import MainLayout from './MainLayout';
import VerifyData from './VerifyData';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import rootReducer from './reducers'
import routeEntry from './reducers/routeEntry'


// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
//make this root reducer after implementing
let store = createStore(routeEntry);

ReactDOM.render(
<Provider store={store}>
  <Router history={browserHistory}>

      <Route component={MainLayout}>
        <Route path="/" component={App} />
        <Route path="/verify" component={VerifyData} />
      </Route>

  </Router>
</Provider>,
  document.getElementById('root')
);
