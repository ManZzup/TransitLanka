import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import { createStore,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import SearchResultPageComponent from './';
import rootReducer from '../../../reducers';

let store = createStore(rootReducer,applyMiddleware(
    thunkMiddleware
));

it('renders Search Results Page correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <SearchResultPageComponent startText="Pettah" endText="Moratuwa" />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
