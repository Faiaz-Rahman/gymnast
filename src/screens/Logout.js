import React, {useContext, useEffect} from 'react';
import {StatusBar, Text, View} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

import LottieView from 'lottie-react-native';
import {COLORS} from '../constants';

export default function Logout() {
  const {anim, setAnim, logout} = useContext(AuthContext);

  const interval = () => {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: COLORS.white,
        }}>
        <StatusBar backgroundColor="white" barStyle={'dark-content'} />
        <LottieView source={require('../assets/loader.json')} autoPlay loop />
      </View>
    );
  };

  useEffect(() => {
    setAnim(true);
    setTimeout(() => {
      logout();
      setAnim(false);
    }, 1500);
  }, []);

  return (
    <>
      {anim && interval()}
      {!anim && (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
          }}>
          <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
        </View>
      )}
    </>
  );
}
