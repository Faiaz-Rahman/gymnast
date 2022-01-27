import React, {useEffect} from 'react';

import {StyleSheet, Text, View, StatusBar} from 'react-native';

import {COLORS} from '../constants';
import Logo from '../components/Logo';

export default function SplashScreen({navigation}) {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('menuScreen');
    }, 2000);
  }, []);
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Logo />
      <Text style={styles.appName}>Appname</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
