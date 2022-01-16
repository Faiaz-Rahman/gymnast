import React, {useEffect, useState} from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-community/async-storage';

import GetStarted from '../screens/GetStarted';
import MenuScreen from '../screens/MenuScreen';
import RegisterMenu from '../screens/RegisterMenu';
import CustomerRegistration from '../screens/CustomerRegistration';
import OwnerRegistration from '../screens/OwnerRegistration';
import LoginScreen from '../screens/LoginScreen';
import LoginMenu from '../screens/LoginMenu';

const Stack = createNativeStackNavigator();

const LoginNavigator = () => {
  const [isFirstLaunch, setIsFirstLaunch] = useState(null);

  let routename;

  useEffect(() => {
    AsyncStorage.getItem('alreadyLaunched').then(value => {
      if (value == null) {
        AsyncStorage.setItem('alreadyLaunched', 'true');
        setIsFirstLaunch(true);
      } else {
        setIsFirstLaunch(false);
      }
    });
  }, []);

  if (isFirstLaunch === null) {
    return null;
  } else if (isFirstLaunch === true) {
    routename = 'gettingStarted';
  } else {
    routename = 'menuScreen';
  }

  return (
    <Stack.Navigator initialRouteName={routename}>
      <Stack.Screen
        name="gettingStarted"
        component={GetStarted}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="menuScreen"
        component={MenuScreen}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="login"
        component={LoginScreen}
        options={{
          headerShown: false,
          animation: 'fade',
        }}
      />

      <Stack.Screen
        name="loginMenu"
        component={LoginMenu}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />

      <Stack.Screen
        name="registerMenu"
        component={RegisterMenu}
        options={{
          headerShown: false,
          animation: 'slide_from_left',
        }}
      />
      <Stack.Screen
        name="customerReg"
        component={CustomerRegistration}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
      <Stack.Screen
        name="ownerReg"
        component={OwnerRegistration}
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
      />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
