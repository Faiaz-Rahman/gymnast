// This screen is shown only first time the app is installed

import React, {useRef, useEffect} from 'react';
import {Animated, Image, StatusBar, StyleSheet, Text, View} from 'react-native';
import Buttons from '../components/Buttons';
import {COLORS, DIM} from '../constants';

export default function GetStarted({navigation}) {
  // Animated Value initiated to zero
  const animation = useRef(new Animated.Value(0)).current;

  const animatedStyles = {
    transform: [
      {
        scale: animation,
      },
    ],
  };

  useEffect(() => {
    // Animation Added
    Animated.timing(animation, {
      toValue: 1,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Animated.View style={[styles.logoContainer, animatedStyles]}>
        <Image
          source={require('../assets/logo.png')}
          style={styles.logo}
          resizeMode={'cover'}
        />
      </Animated.View>
      <Text style={styles.appName}>Appname</Text>
      <View
        style={{
          height: DIM.height * 0.16,
          padding: 16,
          //   backgroundColor: 'yellow',
        }}>
        <Text style={styles.subTitle}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt.
        </Text>
      </View>
      <Buttons
        text={'Get Started!'}
        style={styles.custom}
        iconName="angle-right"
        onPress={() => navigation.navigate('menuScreen')}
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
    position: 'absolute',
    bottom: 55,
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
  subTitle: {
    color: 'slategrey',
    fontSize: 19,
    letterSpacing: 2,
    fontWeight: '600',
    textAlign: 'justify',
  },
});
