import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {COLORS, DIM} from '../constants';

export default function Card({item}) {
  return (
    <View style={styles.containerCard}>
      <Image
        source={{uri: item.uri}}
        style={{
          height: '100%',
          width: '100%',
        }}
      />
    </View>
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
