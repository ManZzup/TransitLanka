import React from 'react';
import { View, Text, StyleSheet,FlatList, TouchableHighlight, Button  } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

const ResultItem = (props) => (
    <TouchableHighlight style={styles.resultitem}
                        onPress={() => props.onPress(props.id)}
                        underlayColor='#ffae00'>
        <View style={{flex:1,flexDirection:'row',width:'100%'}}>
          <Text style={styles.resulttext}>{props.title}</Text>
          <View style={{flex:1,flexDirection:'column',justifyContent:'center'}}>
            <FontAwesome style={{alignSelf:'flex-end'}}>{Icons.chevronRight}</FontAwesome>
          </View>
        </View>
    </TouchableHighlight>
);
const Results = (props) => (
        <View style={styles.container}>
          <View style={styles.section}>
            <Button title="Save Results" style={styles.button}></Button>
          </View>
          <FlatList data={props.results}
                    style={styles.list}
                    renderItem={({item}) => {
                        return(
                          <ResultItem style={styles.resultitem}
                                      key={item.id} id={item.id}
                                      title={item.title}
                                      onPress={props.onPress} />
                        )}} />

        </View>
);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button:{

  },
  list:{
    alignSelf: 'stretch',
    padding:10,
  },
  resultitem: {
    backgroundColor: '#ffffff',
    alignSelf: 'stretch',
    flexDirection: 'row',
    padding:20,
    marginBottom:10,
    borderColor: '#000',
    borderWidth: 1
  },
  resulttext:{
    fontSize:20
  },
  section:{
    width:'100%',
    borderBottomColor: '#000',
    borderBottomWidth: 2,
  }
});


export default Results;
