import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import { createStore,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import SearchPageComponent from './';
import rootReducer from '../../../reducers';

let store = createStore(rootReducer,applyMiddleware(
    thunkMiddleware
));

it('renders Search Page correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <SearchPageComponent />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
