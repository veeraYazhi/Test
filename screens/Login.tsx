import React, {useState} from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import InputText from '../components/InputText';

const Login = ({navigation}) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const onSubmit = () => {
    navigation.navigate('TaskList');
  };

  return (
    <ImageBackground
      style={styles.backGroundImg}
      source={require('../assets/time1.jpeg')}>
      <View style={styles.container}>
        <View style={styles.SectionStyle}>
          <Text style={styles.headerTxt}>LOGIN</Text>
        </View>

        <View style={styles.SectionStyle}>
          <InputText
            value={userName}
            placeholderText={'User Name'}
            onChangeTxt={(text: any) => setUserName(text)}
            inputStyle={styles.textInput}
            textType={'userName'}
            secureText={false}
          />
        </View>
        <View style={styles.SectionStyle}>
          <InputText
            value={password}
            placeholderText={'Password'}
            onChangeTxt={setPassword}
            inputStyle={styles.textInput}
            textType={'password'}
            secureText={true}
          />
        </View>
        <View style={styles.SectionStyle}>
          <TouchableOpacity style={styles.loginButton} onPress={onSubmit}>
            <Text style={styles.loginButtonTxt}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  SectionStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 10,
    marginRight: 10,
    margin: 10,
  },
  backGroundImg: {
    flex: 1,
    resizeMode: 'cover',
  },
  headerTxt: {
    fontSize: 28,
    fontWeight: '600',
    lineHeight: 32,
    color: '#900',
    textAlign: 'center',
  },

  textInput: {
    marginLeft: 10,
    fontSize: 16,
    width: '80%',
    color: '#000',
    borderBottomWidth: 1,
  },
  loginButton: {
    alignItems: 'center',
    alignSelf: 'center',
    width: '80%',
    backgroundColor: '#900',
    paddingVertical: 10,
    borderRadius: 16,
  },
  loginButtonTxt: {
    color: 'white',
    fontSize: 14,
  },
});
export default Login;
