import React from 'react';
import { View,Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const SelectedPlace = (props) => (
      <View style={styles.container}>
        <TextInput style={styles.txtInput} editable={false}>{props.place}</TextInput>
        <TouchableOpacity onPress={props.onPress} activeOpacity={0.8}>
            <TextInput style={styles.txtInput2} editable={false}>X</TextInput>
        </TouchableOpacity>
      </View>
);

var styles = StyleSheet.create({
  txtInput:{
    width:'80%',
    borderWidth:4,
    borderColor:'#ffae00',
    marginBottom: 10,
    marginTop: 10,
    fontSize:20,
    paddingLeft:15,
    paddingRight:15,
    color:'#1C6BA0',
    borderRightWidth:0
  },
  txtInput2:{
    width:'80%',
    borderWidth:4,
    borderColor:'#ffae00',
    marginBottom: 10,
    marginTop: 10,
    fontSize:20,
    paddingLeft:15,
    paddingRight:15,
    color:'#1C6BA0',
    backgroundColor:'#ffae00'
  },
  container:{
    flexDirection:'row'
  }
});

export default SelectedPlace;
