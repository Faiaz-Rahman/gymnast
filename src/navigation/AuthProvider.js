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
        register: async (
          email,
          pass,
          name,
          phone,
          address,
          height,
          weight,
          gym,
          pool,
        ) => {
          try {
            await auth().createUserWithEmailAndPassword(email, pass);

            await firestore()
              .collection('users')
              .add({
                userId: auth().currentUser.uid,
                name,
                createdAt: firestore.Timestamp.fromDate(new Date()),
                email,
                phone,
                address,
                height,
                weight,
                gym,
                pool,
              })
              .then(() => console.log('User added !'))
              .catch(error => Alert.alert('Appname', error));
            Alert.alert(
              'Appname',
              'Your account has been created, Login to continue',
            );
            setTimeout(() => {
              setUser(null);
            }, 2000);
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
        ownerRegister: async (
          name,
          address,
          email,
          pass,
          state,
          city,
          szPool,
          len,
          brdth,
          mob,
          pan,
          gst,
          selectedDays,
        ) => {
          try {
            await auth().createUserWithEmailAndPassword(email, pass);
            let docString = auth().currentUser.uid.toString();

            await firestore()
              .collection('owners')
              .doc(docString)
              .set({
                userId: auth().currentUser.uid,
                name,
                createdAt: firestore.Timestamp.fromDate(new Date()),
                address,
                email,
                state,
                city,
                szPool,
                len,
                brdth,
                mob,
                pan,
                gst,
                selectedDays,
              })
              .then(() => console.log('Admin added !'))
              .catch(error => Alert.alert('Appname', error));
            Alert.alert(
              'Appname',
              'Your account has been created, Login to continue',
            );
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
