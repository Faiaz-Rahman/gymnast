import React from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';

import Fontisto from 'react-native-vector-icons/Fontisto';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {COLORS, DIM} from '../constants';

export default function ({
  text,
  customStyle,
  iconName,
  onPress,
  inAppIcon,
  letterSpacing,
}) {
  return (
    <TouchableOpacity style={[styles.container, customStyle]} onPress={onPress}>
      <View style={styles.buttonTextContainer}>
        <Text style={[styles.buttonText, {letterSpacing}]}>{text}</Text>
        <MaterialCommunityIcons
          name={inAppIcon}
          size={35}
          color={COLORS.white}
          style={styles.inAppIcon}
        />
      </View>
      <View style={styles.iconContainer}>
        <Fontisto name={iconName} size={25} color={COLORS.primary} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    height: DIM.height * 0.1,
    width: DIM.width * 0.82,
    borderRadius: 40,
    backgroundColor: COLORS.lemon,
    flexDirection: 'row',
  },
  buttonText: {
    fontSize: 25,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonTextContainer: {
    backgroundColor: COLORS.primary,
    height: '100%',
    width: '80%',
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  iconContainer: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inAppIcon: {
    marginLeft: 10,
  },
});
