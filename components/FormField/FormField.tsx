import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './FormField.styles';

export type FormFieldProps = {
  label: string;
  error?: string | string[];
  disabled?: boolean;
  outline?: boolean;
};

export const FormField: React.FC<FormFieldProps> = ({
  children,
  label,
  error,
  disabled,
  outline,
}) => {
  const backgroundStyle = disabled
    ? styles.disabledBackground
    : styles.enabledBackground;
  return (
    <View
      style={[
        styles.inputFieldContainer,
        backgroundStyle,
        outline ? styles.outline : {},
      ]}>
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{label}</Text>
      </View>
      {children}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
    </View>
  );
};
