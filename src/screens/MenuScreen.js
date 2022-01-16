import React from 'react';
import {Image, StatusBar, StyleSheet, Text, View} from 'react-native';

import {COLORS} from '../constants';

import Buttons from '../components/Buttons';

export default function MenuScreen({navigation}) {
  return (
    <View style={styles.container}>
      {/* <StatusBar backgroundColor="red" /> */}
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode={'cover'}
        />
      </View>
      <Text style={styles.appName}>Appname</Text>
      <Buttons
        text={'LOGIN'}
        customStyle={styles.custom}
        iconName="angle-right"
        inAppIcon={'account-arrow-right'}
        letterSpacing={3}
        onPress={() => navigation.navigate('login')}
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
  logo: {
    height: 400,
    width: 400,
  },
  logoContainer: {
    overflow: 'hidden',
    height: 133,
    width: 133,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 15,
    borderRadius: 26,
  },
});
