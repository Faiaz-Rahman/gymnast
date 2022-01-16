import React, {useState, useContext} from 'react';
import {Alert, StyleSheet, View} from 'react-native';
import LottieView from 'lottie-react-native';

import {COLORS} from '../constants';

import Logo from '../components/Logo';
import CustomInput from '../components/CustomInput';
import Buttons from '../components/Buttons';

import {AuthContext} from '../navigation/AuthProvider';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const {login, anim, setAnim} = useContext(AuthContext);

  const interval = () => {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
        <LottieView source={require('../assets/loader.json')} autoPlay loop />
      </>
    );
  };

  return (
    <>
      {anim && interval()}
      {!anim && (
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
            onPress={() => {
              if (email === '' && pass === '') {
                Alert.alert('Appname', 'Provide your email and password');
              } else {
                setAnim(true);
                setTimeout(() => {
                  login(email, pass);
                }, 1500);
              }
            }}
          />
        </View>
      )}
    </>
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
