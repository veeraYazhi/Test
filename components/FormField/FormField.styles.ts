import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  inputFieldContainer: {
    width: '100%',
    // padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  labelContainer: {
    height: 26,
    marginBottom: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  labelText: {
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    marginTop: 10,
    fontSize: 14,
    color: 'red',
  },
  enabledBackground: {
    // backgroundColor: 'white',
  },
  disabledBackground: {
    backgroundColor: 'grey',
  },
  outline: {
    borderColor: '#000',
  },
});
