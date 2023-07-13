import React from 'react';
import {StyleProp, TextInput, TextStyle} from 'react-native';
type InputProps = {
  inputStyle?: StyleProp<TextStyle>;
  value?: string;
  placeholderText: string;
  onChangeTxt: any;
  textType: any;
  secureText: boolean;
};
const InputText: React.FC<InputProps> = ({...props}) => {
  return (
    <TextInput
      style={props.inputStyle}
      onChangeText={props.onChangeTxt}
      value={props.value}
      placeholder={props.placeholderText}
      keyboardType="numeric"
      textContentType={props.textType}
      secureTextEntry={props.secureText}
    />
  );
};
export default InputText;
