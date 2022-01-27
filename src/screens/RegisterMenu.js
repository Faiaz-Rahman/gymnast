import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';

import Buttons from '../components/Buttons';
import {COLORS} from '../constants';
import Logo from '../components/Logo';

export default function RegisterMenu({navigation}) {
  return (
    <View style={styles.container}>
      <Logo />
      <Text style={styles.appName}>Appname</Text>
      <View style={styles.titleContainer}>
        {/* Changes made From Register me as a to Register as */}
        <Text style={styles.title}>Register as</Text>
      </View>
      <Buttons
        text={'Customer'}
        customStyle={styles.custom}
        iconName="angle-right"
        letterSpacing={4}
        onPress={() => navigation.navigate('customerReg')}
      />
      <Buttons
        text={'Owner'}
        customStyle={styles.custom}
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
