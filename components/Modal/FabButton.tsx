import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

const FAB = props => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <AntDesign name="pluscircle" size={70} color="#900" />
    </TouchableOpacity>
  );
};

export default FAB;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 70,
    right: 40,
  },
  title: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
