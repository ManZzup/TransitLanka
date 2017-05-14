import React from 'react';
import TrainingButton from './';
import renderer from 'react-test-renderer';

it('renders training button correctly', () => {
  const tree = renderer.create(
    <TrainingButton loadButton={false} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders loading button correctly', () => {
  const tree = renderer.create(
    <TrainingButton loadButton={true} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
