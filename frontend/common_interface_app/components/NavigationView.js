import React from 'react';
import { View, Text, StyleSheet,FlatList, TouchableHighlight  } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

const RouteView = (props) => (
    <View style={styles.rowview}>
        <View style={{minWidth:50, alignItems:'center'}}>
            <FontAwesome style={{color:'#ffae00'}}>{ (props.mode==="train") ? Icons.train : Icons.bus}</FontAwesome>
            <Text style={styles.col_1}>{props.route}</Text>
        </View>
        <Text style={styles.col_2}>From {props.start} to {props.end}</Text>
    </View>
);

const NavigationView = (props) => (
        <View style={styles.container}>
          <View style={styles.wrapper}>
            <Text style={styles.header}>{props.result.title}</Text>

            <FlatList data={props.result.nodes}
                      style={styles.list}
                      renderItem={({item}) => <RouteView route={item.route} start={item.start} end={item.end} mode={item.mode} />} />
          </View>
        </View>
);


var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
    flexDirection: 'column'
  },
  wrapper:{
    backgroundColor: '#FFF',
    margin:15
  },
  list:{
    borderColor:'#1C6BA0',
    borderWidth:1
  },
  rowview:{
    flex: 1,
    flexDirection: 'row',
    padding:10,
  },
  header:{
    backgroundColor: '#1C6BA0',
    color:'#ffffff',
    padding:10,
    fontSize:16,
    borderWidth:0
  },
  col_1:{
    paddingRight:10,
    color:'#1C6BA0',
  },
  col_2:{

  }
});


export default NavigationView;
