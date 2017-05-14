import React from 'react';
import PlacesAutocomplete from './';
import renderer from 'react-test-renderer';

it('renders autocomplete text input correctly', () => {
  const tree = renderer.create(
    <PlacesAutocomplete label="Test Input" placeholder="Test Input" defaultValue="Test Input" id="0" />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
