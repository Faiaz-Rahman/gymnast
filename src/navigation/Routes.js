import React, {useState, useEffect, useContext} from 'react';
import {ActivityIndicator, View, StatusBar} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';

import auth from '@react-native-firebase/auth';

import HomeNavigator from './HomeNavigator';

import LoginNavigator from './LoginNavigator';
import {AuthContext} from './AuthProvider';

const Routes = () => {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = user => {
    setUser(user);
    setInitializing(false);
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) {
    return null;
  } else {
    return (
      <NavigationContainer>
        {user ? <HomeNavigator /> : <LoginNavigator />}
      </NavigationContainer>
    );
  }
};

export default Routes;
