import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-redux'
import { createStore,applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import TrainingPageComponent from './';
import rootReducer from '../../../reducers';

let store = createStore(rootReducer,applyMiddleware(
    thunkMiddleware
));

it('renders Training Page without Training Set correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <TrainingPageComponent startText="Pettah" endText="Moratuwa" hasTrainingSet={false} />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders Training Page with Training Set correctly', () => {
  const tree = renderer.create(
    <Provider store={store}>
      <TrainingPageComponent startText="Pettah" endText="Moratuwa" hasTrainingSet={true} />
    </Provider>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
