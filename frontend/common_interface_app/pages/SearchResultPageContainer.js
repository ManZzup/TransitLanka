import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Button } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Spinner from 'react-native-loading-spinner-overlay';

import ResultsContainer from '../containers/ResultsContainer';

import * as API from '../actions/api';
import * as Search from '../actions/search';

class SearchResultPageContainer extends Component {
  static navigationOptions = {
    title: 'Results'
  }

  render() {
    console.log(this.props.showLoading);
    return (
        <View style={styles.container}>
          <ResultsContainer navigate={this.props.navigation.navigate} />
          <Spinner visible={this.props.showLoading} textContent={"Loading..."} textStyle={{color: '#FFF'}} />
        </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  }
});


function mapStateToProps(state) {
   return {
     startLocation: state.search.startLocation,
     endLocation: state.search.endLocation,
     showLoading: state.search.showLoading
   };
}
function mapDispatchToProps(dispatch) {
  return {
    api: bindActionCreators(API, dispatch),
    actions: bindActionCreators(Search, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(SearchResultPageContainer);
