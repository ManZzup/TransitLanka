import React from 'react';
import ReactDOM from 'react-dom';
// import { HashRouter, Route, BrowserRouter } from 'react-router-dom'
import { Router, Route, browserHistory, hashHistory } from 'react-router'
import { Provider } from 'react-redux'
import { createStore,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import LayoutContainer from './pages/LayoutContainer'
import rootReducer from './reducers'
import SearchPageContainer from './pages/SearchPage/SearchPageContainer';
import SearchResultPageComponent from './pages/SearchResultPage/component/';

let store = createStore(rootReducer,applyMiddleware(
    thunkMiddleware
));


ReactDOM.render(

<Provider store={store}>
  <Router history={browserHistory}>

      <Route component={LayoutContainer}>
        <Route path="/" component={SearchPageContainer} />
        <Route path="/result" component={SearchResultPageComponent} />
      </Route>

  </Router>
</Provider>,
  document.getElementById('root')
);
