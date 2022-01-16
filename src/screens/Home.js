import React, {useContext} from 'react';
import {StyleSheet, Text, View} from 'react-native';

import Buttons from '../components/Buttons';
import {COLORS} from '../constants';

import {AuthContext} from '../navigation/AuthProvider';

export default function Home() {
  // const {logout} = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text
        style={{
          fontSize: 20,
          color: 'slategrey',
          letterSpacing: 2,
        }}>
        Home
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
});
