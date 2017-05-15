import React from 'react';
import { View, Text, StyleSheet,FlatList, TouchableHighlight, Button  } from 'react-native';

const ResultItem = (props) => (
    <TouchableHighlight style={styles.resultitem}
                        onPress={() => props.onPress(props.id)}
                        underlayColor='#ffae00'>
        <Text style={styles.resulttext}>{props.title}</Text>
    </TouchableHighlight>
);
const Results = (props) => (
        <View style={styles.container}>
          <Button title="Save Results" style={styles.button}></Button>
          <FlatList data={props.results}
                    style={styles.list}
                    renderItem={({item}) => {
                        return( <ResultItem style={styles.resultitem}  key={item.id} id={item.id} title={item.title} onPress={props.onPress} /> )}} />

        </View>
);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    paddingTop:10
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
    borderColor: '#cccccc',
    borderWidth: 1
  },
  resulttext:{
    fontSize:20
  }
});


export default Results;
