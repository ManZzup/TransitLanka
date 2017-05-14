import React from 'react';
import SearchButton from './';
import renderer from 'react-test-renderer';

it('renders search button correctly', () => {
  const tree = renderer.create(
    <SearchButton loadButton={false} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders loading button correctly', () => {
  const tree = renderer.create(
    <SearchButton loadButton={true} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
