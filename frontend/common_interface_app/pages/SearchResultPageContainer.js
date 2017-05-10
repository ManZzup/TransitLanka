import React, { Component } from 'react';
import { View, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as API from '../actions/api';
import * as Search from '../actions/search';

class SearchResultPage extends Component {
  static navigationOptions = {
    title: 'Results'
  }

  render() {
    return (
        <View style={styles.container}>

        </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  }
});


function mapStateToProps(state) {
   return {
     startLocation: state.search.startLocation,
     endLocation: state.search.endLocation
   };
}
function mapDispatchToProps(dispatch) {
  return {
    api: bindActionCreators(API, dispatch),
    actions: bindActionCreators(Search, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(SearchResultPage);
