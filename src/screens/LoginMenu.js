import React, {useCallback, useEffect, useState} from 'react';

import {StyleSheet, StatusBar, Text, View} from 'react-native';
import firestore from '@react-native-firebase/firestore';

import Buttons from '../components/Buttons';
import Logo from '../components/Logo';
import {COLORS} from '../constants';

export default function LoginMenu({navigation}) {
  let listOwner = [];
  let listUser = [];

  const [owners, setOwners] = useState([]);
  const [users, setUsers] = useState([]);

  const fetchUsers = async () => {
    try {
      await firestore()
        .collection('owners')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {email} = doc.data();
            listOwner.push(email);
          });
        });
      setOwners(listOwner);
      await firestore()
        .collection('users')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {email} = doc.data();
            listUser.push(email);
          });
        });
      setUsers(listUser);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
    return () => {
      {
        setOwners([]);
        setUsers([]);
      }
    };
    // }, [users, owners]);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <Logo />
      <Text style={styles.appName}>Appname</Text>
      <Buttons
        text={'Admin Login'}
        customStyle={styles.custom}
        iconName="angle-right"
        letterSpacing={3}
        onPress={() => {
          navigation.navigate('login', {owners: owners, users: []});
        }}
      />
      <Buttons
        text={'Customer Login'}
        customStyle={styles.custom}
        iconName="angle-right"
        onPress={() => {
          navigation.navigate('login', {owners: [], users: users});
        }}
        letterSpacing={3}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  appName: {
    fontSize: 30,
    fontWeight: 'bold',
    letterSpacing: 3,
    marginBottom: 5,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  custom: {
    marginTop: 50,
  },
});
