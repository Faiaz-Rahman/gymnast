import React from 'react';

import {createDrawerNavigator} from '@react-navigation/drawer';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Home from '../screens/Home';
import Payment from '../screens/Payment';
import Logout from '../screens/Logout';

const Drawer = createDrawerNavigator();

const HomeNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="home"
      screenOptions={{
        headerShown: false,
      }}>
      <Drawer.Screen
        name="home"
        component={Home}
        options={{
          drawerIcon: () => {
            return <FontAwesome name="home" size={30} color={'slategrey'} />;
          },
          drawerLabelStyle: {
            fontWeight: '900',
            fontSize: 18,
            marginLeft: 7,
          },
          drawerLabel: 'Home',
        }}
      />
      <Drawer.Screen
        name="payment"
        component={Payment}
        options={{
          drawerIcon: () => {
            return (
              <FontAwesome
                name="credit-card-alt"
                size={20}
                color={'slategrey'}
              />
            );
          },
          drawerLabelStyle: {
            fontWeight: '900',
            fontSize: 18,
            marginLeft: 7,
          },
          drawerLabel: 'Payment',
        }}
      />
      <Drawer.Screen
        name="logout"
        component={Logout}
        options={{
          drawerIcon: () => {
            return <Ionicons name="log-out" size={35} color={'slategrey'} />;
          },
          drawerLabelStyle: {
            fontWeight: '900',
            fontSize: 18,
          },
          drawerLabel: 'Logout',
        }}
      />
    </Drawer.Navigator>
  );
};

export default HomeNavigator;
