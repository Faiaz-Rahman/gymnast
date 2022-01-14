import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import GetStarted from '../screens/GetStarted';
import MenuScreen from '../screens/MenuScreen';
import RegisterMenu from '../screens/RegisterMenu';
import CustomerRegistration from '../screens/CustomerRegistration';
import OwnerRegistration from '../screens/OwnerRegistration';

const Stack = createNativeStackNavigator();

const LoginNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="gettingStarted">
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
