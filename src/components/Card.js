import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {COLORS, DIM} from '../constants';

export default function Card({item, onPress}) {
  return (
    <TouchableOpacity style={styles.containerCard} onPress={onPress}>
      <Image
        source={{uri: item.image}}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  containerCard: {
    height: DIM.height * 0.35,
    width: DIM.width * 0.85,
    backgroundColor: COLORS.slate,
    borderRadius: 15,
    marginBottom: 25,
    overflow: 'hidden',
  },
});
