import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'

import LayoutContainer from './pages/LayoutContainer'
import rootReducer from './reducers'
import SearchPageContainer from './pages/SearchPage/SearchPageContainer';

let store = createStore(rootReducer,applyMiddleware(
    thunkMiddleware
));


ReactDOM.render(
<Provider store={store}>
  <HashRouter>

      <LayoutContainer>
        <Route path="/" component={SearchPageContainer} />
      </LayoutContainer>

  </HashRouter>
</Provider>,
  document.getElementById('root')
);
