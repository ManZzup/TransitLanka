import React, { Component } from 'react';
import { AppRegistry, Text, StyleSheet, TouchableHighlight, View, TextInput } from 'react-native';
import { Container, Header, Title, Content, Button, Left, Right, Body, Icon } from 'native-base';
import { createStore,applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  StackNavigator,
} from 'react-navigation';

import rootReducer from './reducers'
import HomePageContainer from './pages/HomePageContainer';
import SearchResultPageContainer from './pages/SearchResultPageContainer';
import NavigationPageContainer from './pages/NavigationPageContainer';

import * as Api from './actions/api';

let store = createStore(rootReducer,applyMiddleware(
    thunkMiddleware
));

const App = StackNavigator({
  Main: {screen: HomePageContainer},
  Result: {screen: SearchResultPageContainer},
  Navigation: {screen: NavigationPageContainer},
});


export default class common_interface_app extends Component {
  render() {
    return (
      <Provider store={store}>
        <App />
      </Provider>
    );
  }
}


AppRegistry.registerComponent('common_interface_app', () => common_interface_app);
