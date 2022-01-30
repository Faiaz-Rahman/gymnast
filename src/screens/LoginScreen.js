import React, {useState, useContext, useEffect} from 'react';
import {Alert, StyleSheet, View, StatusBar} from 'react-native';
import LottieView from 'lottie-react-native';

import {COLORS} from '../constants';

import Logo from '../components/Logo';
import CustomInput from '../components/CustomInput';
import Buttons from '../components/Buttons';

import {AuthContext} from '../navigation/AuthProvider';

export default function LoginScreen({route}) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const admins = route.params.owners;
  const users = route.params.users;
  useEffect(() => {
    console.log(admins, users);
  }, []);

  // Acquired Functions from AuthContext in AuthProvider
  const {login, anim, setAnim} = useContext(AuthContext);

  const interval = () => {
    return (
      <>
        <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: COLORS.white,
          }}>
          {/* Animation loaded with Lottie-React-Native */}
          <LottieView source={require('../assets/loader.json')} autoPlay loop />
        </View>
      </>
    );
  };

  return (
    <>
      {/* If animation state is active this block is run  */}
      {anim && interval()}

      {/* else --- */}
      {!anim && (
        <View style={styles.container}>
          <StatusBar backgroundColor="white" barStyle={'dark-content'} />

          {/* Logo Component */}
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
              if (email === '' || pass === '') {
                Alert.alert(
                  'Appname',
                  'Provide your Email and Password to log in',
                );
              } else if (!users.length && admins.length) {
                if (!admins.includes(email)) {
                  Alert.alert(
                    'Appname',
                    'Open an Admin Account First to Continue.',
                  );
                } else {
                  setAnim(true);

                  // Timeout is set for calling the login function
                  setTimeout(() => {
                    login(email, pass);
                  }, 1500);
                }
              } else if (!admins.length && users.length) {
                if (!users.includes(email)) {
                  Alert.alert(
                    'Appname',
                    'Open a Customer Account First to Continue.',
                  );
                } else {
                  setAnim(true);

                  // Timeout is set for calling the login function
                  setTimeout(() => {
                    login(email, pass);
                  }, 1500);
                }
              } else if (email && pass && (admins.length || users.length)) {
                setAnim(true);

                // Timeout is set for calling the login function
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
