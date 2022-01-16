import React, {createContext, useState} from 'react';

import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {Alert} from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState(null);
  const [anim, setAnim] = useState(null);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        anim,
        setAnim,
        login: async (email, password) => {
          try {
            await auth().signInWithEmailAndPassword(email, password);
            setTimeout(() => {
              setAnim(false);
            }, 1500);
          } catch (e) {
            setAnim(false);
            Alert.alert(
              'Appname',
              "If you don't have an account, please register.",
            );
          }
        },
        register: async (email, password, firstName) => {
          try {
            await auth().createUserWithEmailAndPassword(email, password);

            await firestore()
              .collection('users')
              .add({
                userId: auth().currentUser.uid,
                name: firstName,
                createdAt: firestore.Timestamp.fromDate(new Date()),
                userImg: 'none',
                email: auth().currentUser.email,
              })
              .then(() => console.log('User added !'))
              .catch(error => console.log(error));

            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
        logout: async () => {
          try {
            await auth().signOut();
          } catch (e) {
            console.log(e);
          }
        },
      }}>
      {children}
    </AuthContext.Provider>
  );
};
