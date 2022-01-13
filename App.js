import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import LoginNavigator from './src/navigation/LoginNavigator';

const App = () => {
  return (
    <NavigationContainer>
      <LoginNavigator />
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({});

export default App;
