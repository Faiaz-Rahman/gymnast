import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';

import {COLORS} from '../constants';

import Buttons from '../components/Buttons';
import Logo from '../components/Logo';

export default function MenuScreen({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="white" barStyle={'dark-content'} />
      <Logo />
      <Text style={styles.appName}>Appname</Text>
      <Buttons
        text={'LOGIN'}
        customStyle={styles.custom}
        iconName="angle-right"
        inAppIcon={'account-arrow-right'}
        letterSpacing={3}
        onPress={() => navigation.navigate('loginMenu')}
      />
      <Buttons
        text={'REGISTER'}
        customStyle={styles.custom}
        iconName="angle-right"
        onPress={() => navigation.navigate('registerMenu')}
        inAppIcon={'account-plus'}
        letterSpacing={3}
      />
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
  custom: {
    marginTop: 50,
  },
});
