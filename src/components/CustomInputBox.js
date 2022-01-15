import React from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import {COLORS, DIM} from '../constants';

export default function CustomInputBox({customStyle}) {
  return (
    <View style={[styles.container, customStyle]}>
      <TextInput placeholder="" placeholderTextColor={''} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: DIM.height * 0.07,
    width: DIM.width * 0.2,
    backgroundColor: COLORS.white,
  },
});
