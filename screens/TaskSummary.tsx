import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Button} from 'react-native';
export const TaskSummaryScreen = ({route, navigation}) => {
  console.log('route params', route.params);
  const routeParam = route.params;
  return (
    <View style={styles.mainContainer}>
      ``
      <View style={styles.container}>
        <View style={{flex: 3}}>
          <Text style={styles.txt}>Task Name:</Text>
          <Text style={styles.txt}>Description: </Text>
          <Text style={styles.txt}>Total time spent: </Text>
          <Text style={styles.txt}>Tag: </Text>
          {/* Render additional user details */}
        </View>
        <View style={{flex: 3, alignItems: 'flex-end'}}>
          <Text style={styles.txt}>{routeParam.params.task} </Text>
          <Text style={styles.txt}>{routeParam.params.des}</Text>
          <Text style={styles.txt}>{routeParam.params.spentTime}</Text>
          <Text style={styles.txt}>{routeParam.params.priority}</Text>
          {/* Render additional user details */}
        </View>
      </View>
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.btText}>OK</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 20,
  },
  container: {
    flexDirection: 'row',
  },
  txt: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  submitButton: {
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 40,
    backgroundColor: '#900',
    borderRadius: 4,
    paddingVertical: 10,
    alignContent: 'center',
  },
  btText: {
    color: 'white',
  },
});
