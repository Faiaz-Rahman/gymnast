import React, {useContext, useEffect} from 'react';
import {Text, View} from 'react-native';
import {AuthContext} from '../navigation/AuthProvider';

import LottieView from 'lottie-react-native';

export default function Logout() {
  const {anim, setAnim, logout} = useContext(AuthContext);

  const interval = () => {
    return (
      <>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}></View>
        <LottieView source={require('../assets/loader.json')} autoPlay loop />
      </>
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
        <View>
          <Text></Text>
        </View>
      )}
    </>
  );
}
