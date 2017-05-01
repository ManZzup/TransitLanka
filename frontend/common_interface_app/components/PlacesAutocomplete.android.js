import React from 'react';
import { Container, Content, InputGroup, Input } from 'native-base';
import { Text } from 'react-native';

const PlacesAutocomplete = (props) => (
      <Container>
        <Content>
        <InputGroup borderType="underline" >
            <Input placeholder="placeholder" />
        </InputGroup>
        </Content>
      </Container>
);


export default PlacesAutocomplete;
