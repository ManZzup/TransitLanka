import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text } from 'react-native';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import * as API from '../actions/api';

class SearchLocationButtonContainer extends Component {
  render() {
    return (
        <TouchableOpacity onPress={this.props.onPress}
                          style={styles.button}
                          activeOpacity={0.8}>
            <Text style={styles.buttonText}><FontAwesome>{Icons.search}</FontAwesome> search</Text>
        </TouchableOpacity>
    );
  }
}


var styles = StyleSheet.create({
  button:{
      backgroundColor: '#ffae00',
      padding: 20
  },
  buttonText:{
    fontSize: 20
  }
});


function mapStateToProps(state) {
   return {
     txt: state.ui.curText
   };
}
function mapDispatchToProps(dispatch) {
  return {
    api: bindActionCreators(API, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(SearchLocationButtonContainer);
