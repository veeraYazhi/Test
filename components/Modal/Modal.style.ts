import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modal: {
    backgroundColor: 'white',
    width: '90%',
    margin: 10,
    borderRadius: 20,
    paddingVertical: 24,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
});
