/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, Text } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon } from 'native-base';

import PlacesAutocomplete from './components/PlacesAutocomplete';

export default class common_interface_app extends Component {
  render() {
    return (
      <Container>
                <Header>
                    <Left>
                        <Button transparent>
                            <Icon name='menu' />
                        </Button>
                    </Left>
                    <Body>
                        <Title>Transit Lanka</Title>
                    </Body>
                    <Right />
                </Header>
                <Content>
                    <PlacesAutocomplete />
                </Content>
            </Container>
    );
  }
}

AppRegistry.registerComponent('common_interface_app', () => common_interface_app);
