import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import Buttons from '../components/Buttons';

import Logo from '../components/Logo';
import {COLORS} from '../constants';

export default function LoginMenu({navigation}) {
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.appName}>Appname</Text>
      <Buttons
        text={'Admin Login'}
        customStyle={styles.custom}
        iconName="angle-right"
        letterSpacing={3}
        onPress={() => navigation.navigate('login')}
      />
      <Buttons
        text={'Customer Login'}
        customStyle={styles.custom}
        iconName="angle-right"
        onPress={() => navigation.navigate('login')}
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
