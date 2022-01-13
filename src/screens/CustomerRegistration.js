import React, {useState} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
  Image,
  ScrollView,
  Modal,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import CustomInput from '../components/CustomInput';

import {COLORS, DIM} from '../constants';

export default function CustomerRegistration() {
  const [email, setEmail] = useState('');
  const [db, setDb] = useState('');
  const [name, setName] = useState('');
  const [pass, setPass] = useState('');
  const [confPass, setConfPass] = useState('');
  const [ph, setPh] = useState('');
  const [address, setAddress] = useState('');

  const [calOpen, setCalOpen] = useState(false);

  const [selectedDate, setSelectedDate] = React.useState('2020-02-01');

  return (
    <>
      {calOpen && (
        <Modal
          animationType="slide"
          transparent
          onRequestClose={() => setCalOpen(false)}>
          <View style={styles.modalStyle}></View>
        </Modal>
      )}

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/logo.png')}
            style={styles.logo}
            resizeMode={'cover'}
          />
        </View>
        <Text
          style={{
            fontSize: 35,
            fontWeight: '900',
            marginBottom: 20,
            letterSpacing: 3,
            textAlign: 'center',
          }}>
          Customer Registration
        </Text>
        <CustomInput
          text="Enter your name"
          iconName="create-sharp"
          customStyle={styles.custom}
          onChangeText={text => setName(text)}
        />

        <TouchableWithoutFeedback
          onPress={() => {
            setCalOpen(true);
          }}>
          <View style={styles.textContainer}>
            <MaterialCommunityIcons
              name="calendar"
              size={30}
              color={'grey'}
              style={styles.icon}
            />
            <Text style={styles.text}>Date of Birth</Text>
          </View>
        </TouchableWithoutFeedback>

        <CustomInput
          text="Enter the email"
          iconName="mail"
          customStyle={styles.custom}
          onChangeText={text => setEmail(text)}
        />
        <CustomInput
          text="Enter password"
          iconName="lock-open"
          customStyle={styles.custom}
          onChangeText={text => setPass(text)}
          passEntry
        />
        <CustomInput
          text="Confirm password"
          iconName="lock-open"
          customStyle={styles.custom}
          onChangeText={text => setConfPass(text)}
          passEntry
        />
        <CustomInput
          text="Enter phone no."
          iconName="call"
          customStyle={styles.custom}
          onChangeText={text => setPh(text)}
          keyboardType={'numeric'}
        />
        <CustomInput
          text="Enter your Address"
          iconName="location-sharp"
          customStyle={styles.custom}
          onChangeText={text => setAddress(text)}
        />
      </ScrollView>
    </>
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
    paddingTop: 40,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 200,
  },
  custom: {
    marginBottom: 20,
  },
  icon: {
    marginRight: 18,
  },
  logo: {
    height: 400,
    width: 400,
  },
  logoContainer: {
    overflow: 'hidden',
    height: 133,
    width: 133,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 15,
    borderRadius: 26,
  },
  modalStyle: {
    paddingTop: 15,
    height: DIM.height * 0.55,
    width: DIM.width * 0.9,
    backgroundColor: 'white',
    top: '25%',
    bottom: '25%',
    left: '5%',
    right: '5%',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderRightColor: 'green',
    borderLeftColor: COLORS.lightViolet,
    borderTopColor: 'tomato',
    borderBottomColor: 'yellow',
    borderWidth: 10,
    opacity: 0.75,
    elevation: 4,
  },
  textContainer: {
    flexDirection: 'row',
    height: DIM.height * 0.1,
    width: DIM.width * 0.85,
    alignItems: 'center',
    backgroundColor: COLORS.slate,
    borderRadius: 15,
    paddingLeft: 20,
    marginBottom: 20,
  },
  text: {
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'italic',
    letterSpacing: 1.5,
    opacity: 0.9,
    color: 'grey',
  },
});
