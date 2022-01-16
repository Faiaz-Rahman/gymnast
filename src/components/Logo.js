import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';

export default function Logo({customStyle}) {
  return (
    <View style={[styles.logoContainer, customStyle]}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode={'cover'}
      />
    </View>
  );
}

const styles = StyleSheet.create({
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
