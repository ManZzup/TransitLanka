import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Animated,
  Button,
  ListView,
  TouchableHighlight,
  FlatList
} from 'react-native';

const RowView = (props) => (
    <TouchableHighlight onPress={props.onSelect}
                        underlayColor='#ffae00'>
      <Text style={styles.listitem}>{props.text}</Text>
    </TouchableHighlight>
);
const SlideUpPanel = (props) => (
        <Animated.View
          style={[styles.subView,
            {transform: [{translateY: props.bounceValue}]}]}>

          <ListView
            dataSource={props.dataSource}
            enableEmptySections={true}
            renderRow={(rowData) => <RowView text={rowData.node} key={rowData.key} onSelect={ () => props.onSelect(rowData.node,rowData.key,props.txtInput)}  /> } />
        </Animated.View>
);

var styles = StyleSheet.create({
  subView: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#FFFFFF",
    height: 200,
  },
  listitem: {
    textAlign:'center',
    lineHeight:30,
    fontSize:20,
    textAlignVertical:'center'
  }
});


export default SlideUpPanel;
