import React from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

import {COLORS, DIM} from '../constants';

export default function Payment({navigation}) {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Octicons name="three-bars" size={30} color={COLORS.black} />
        </TouchableOpacity>
        <View
          style={{
            width: '60%',
            height: '85%',
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 30,
            backgroundColor: COLORS.slate,
          }}>
          <Text
            style={{
              fontSize: 22,
              fontWeight: 'bold',
              color: COLORS.black,
            }}>
            {'Payment'}
          </Text>
        </View>
        <TouchableOpacity
          style={{
            width: '20%',
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <FontAwesome name="search" size={30} color={COLORS.black} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: DIM.height * 0.01,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  header: {
    height: DIM.height * 0.1,
    width: DIM.width,
    flexDirection: 'row',
    // backgroundColor: 'red',
    alignItems: 'center',
    marginBottom: 2,
  },
});
