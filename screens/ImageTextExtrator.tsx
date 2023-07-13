/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState} from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ml from '@react-native-firebase/ml';
import TextRecognition from '@react-native-ml-kit/text-recognition';

const App = () => {
  const [image, setImage] = useState();
  const onTakePhoto = () => launchCamera({mediaType: 'photo'}, onImageSelect);
  const onSelectImagePress = () =>
    launchImageLibrary({mediaType: 'photo'}, onImageSelect);
  const onImageSelect = async media => {
    console.log(media);
    if (!media.didCancel) {
      setImage(media.assets[0].uri);
      const _result = await TextRecognition.recognize(
        'file://' + media.assets[0].uri,
      );
      // const processingResult =
      // await ml().cloudDocumentTextRecognizerProcessImage(image);
      const markSheet = _result.blocks.map((item, i) => {
        if (item) {
          console.log(item.text);
        }
      });
      console.log(markSheet);
  };
  return (
    <ScrollView contentContainerStyle={styles.screen}>
      <Text style={styles.title}>Marksheet Analysis</Text>
      <View>
        <TouchableOpacity style={styles.button} onPress={onTakePhoto}>
          <Text style={styles.buttonText}>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={onSelectImagePress}>
          <Text style={styles.buttonText}>Pick a Photo</Text>
        </TouchableOpacity>
        <Image
          source={{uri: image}}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 35,
    marginVertical: 40,
  },
  button: {
    backgroundColor: '#47477b',
    color: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 50,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
  },
  image: {
    height: 300,
    width: 300,
    marginTop: 30,
    borderRadius: 10,
  },
});
export default App;
