import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';
import { Router, Route, browserHistory } from 'react-router'
import MainLayoutContainer from './pages/MainLayoutContainer';
import VerifyData from './VerifyData';
import { Provider } from 'react-redux'
import { createStore,applyMiddleware } from 'redux'
import rootReducer from './reducers'
import thunkMiddleware from 'redux-thunk'


// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// );
//make this root reducer after implementing
let store = createStore(rootReducer,applyMiddleware(
    thunkMiddleware
  ));

  // console.log(store.getState());

ReactDOM.render(
<Provider store={store}>
  <Router history={browserHistory}>

      <Route component={MainLayoutContainer}>
        <Route path="/" component={App} />
        <Route path="/verify" component={VerifyData} />
      </Route>

  </Router>
</Provider>,
  document.getElementById('root')
);
