import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {COLORS} from '../constants';

import Logo from '../components/Logo';
import CustomInput from '../components/CustomInput';
import Buttons from '../components/Buttons';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  return (
    <View style={styles.container}>
      <Logo customStyle={styles.customStyle} />
      <CustomInput
        text="Enter your email"
        iconName="mail"
        customStyle={styles.custom}
        onChangeText={text => setEmail(text)}
      />
      <CustomInput
        text="Enter Password"
        iconName="key"
        customStyle={styles.custom}
        onChangeText={text => setPass(text)}
        passEntry
      />
      <Buttons
        text={'Login'}
        inAppIcon={'share-outline'}
        iconName="angle-right"
        style={styles.loginButton}
        onPress={() => console.log(email, pass)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  custom: {
    marginBottom: 25,
  },
  customStyle: {
    marginBottom: 30,
  },
  loginButton: {
    elevation: 2,
  },
});
