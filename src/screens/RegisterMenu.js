import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Buttons from '../components/Buttons';
import {COLORS} from '../constants';

export default function RegisterMenu({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode={'cover'}
        />
      </View>
      <Text style={styles.appName}>Appname</Text>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Register me as a -</Text>
      </View>
      <Buttons
        text={'Customer'}
        style={styles.custom}
        iconName="angle-right"
        letterSpacing={4}
        onPress={() => navigation.navigate('customerReg')}
      />
      <Buttons
        text={'Owner'}
        style={styles.custom}
        iconName="angle-right"
        letterSpacing={4}
        onPress={() => navigation.navigate('ownerReg')}
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
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
  titleContainer: {
    paddingTop: 20,
  },
  title: {
    color: '#00022e',
    fontSize: 20,
    fontWeight: '900',
    letterSpacing: 3,
  },
});
