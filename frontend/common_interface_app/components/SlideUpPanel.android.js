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
  FlatList,
  TouchableOpacity
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
          <TouchableOpacity onPress={props.onClose} style={styles.button} activeOpacity={0.8}>
            <Text style={styles.button_text}>Close</Text>
          </TouchableOpacity>
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
    textAlignVertical:'center',
    borderBottomColor:'#cccccc',
    borderBottomWidth:1,
    lineHeight:30,
    paddingBottom:10
  },
  button:{
    backgroundColor:'#1C6BA0',
    borderBottomColor:'#000000',
    borderBottomWidth:2
  },
  button_text:{
    textAlign: 'center',
    fontSize:20,
    lineHeight:20,
    paddingTop:10,
    paddingBottom:10
  },
});


export default SlideUpPanel;
