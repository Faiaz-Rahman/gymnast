import React, {useContext, useState} from 'react';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  Text,
  View,
  ScrollView,
  StatusBar,
  Modal,
} from 'react-native';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CalendarPicker from 'react-native-calendar-picker';
import {Formik} from 'formik';
import * as yup from 'yup';

import CheckBox from '@react-native-community/checkbox';

import CustomInput from '../components/CustomInput';
import Logo from '../components/Logo';
import ErrorComponent from '../components/ErrorComponent';

import {COLORS, DIM} from '../constants';
import Buttons from '../components/Buttons';
import {AuthContext} from '../navigation/AuthProvider';

export default function CustomerRegistration() {
  const [selectedDate, setSelectedDate] = useState('Date of Birth');

  // Declaring The Validation Schema For Validating Form Input
  const validationSchema = yup.object().shape({
    name: yup.string().required('Your name is required !'),
    email: yup
      .string()
      .email('Please enter valid email')
      .required('Email Address is required !'),
    pass: yup.string().required('Password is required !'),
    confPass: yup
      .string()
      .oneOf([yup.ref('pass'), null], 'Passwords not match !'),
    phone: yup
      .string()
      .min(10, 'Phone number must be of 10 digits')
      .max(10, 'Phone number must be of 10 digits')
      .required('Phone Number is required !'),
    address: yup.string().required('Address is required !'),
  });

  const [calOpen, setCalOpen] = useState(false);
  const [gym, setGym] = useState(false);
  const [pool, setPool] = useState(false);
  const [dob, setDob] = useState(false);

  // This array's been taken for taking checkbox inputs
  const checkBox = [];
  const addSelectionToArray = () => {
    if (gym) checkBox.push('gym');
    if (pool) checkBox.push('pool');
  };

  // Register Method's been called from the AuthContext in AuthProvider
  const {register} = useContext(AuthContext);

  return (
    <>
      {/* Opens Up the Calendar */}
      {calOpen && (
        <Modal
          animationType="slide"
          transparent
          onRequestClose={() => {
            setCalOpen(false);
          }}>
          <View style={styles.modalStyle}>
            <CalendarPicker
              onDateChange={date => {
                const month = date.toString().slice(4, 7);
                const datetime = date.toString().slice(8, 10);
                const year = date.toString().slice(11, 15);

                // Formatting the Date (From object to string)
                setSelectedDate(month + ' ' + datetime + ', ' + year);
                setDob(true);
              }}
              selectedDayStyle={{
                backgroundColor: COLORS.primary,
                color: COLORS.white,
              }}
              textStyle={{
                fontSize: 15,
                fontWeight: '600',
                color: COLORS.black,
              }}
              height={DIM.height * 0.55}
              width={DIM.width * 0.87}
            />
          </View>
        </Modal>
      )}
      <StatusBar backgroundColor="white" barStyle={'dark-content'} />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        {/* Renders the Logo of App */}
        <Logo />
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

        {/* Taking Form Input and Validation with Formik */}
        <Formik
          initialValues={{
            name: '',
            email: '',
            pass: '',
            confPass: '',
            phone: '',
            address: '',
            height: '',
            weight: '',
          }}
          validationSchema={validationSchema}
          onSubmit={({
            name,
            email,
            pass,
            confPass,
            phone,
            address,
            height,
            weight,
          }) => {
            let gym = '',
              pool = '';
            if (checkBox.includes('gym')) {
              gym = 'gym';
            }
            if (checkBox.includes('pool')) {
              pool = 'pool';
            }
            register(
              email,
              pass,
              name,
              phone,
              address,
              height,
              weight,
              gym,
              pool,
              selectedDate,
            );
          }}>
          {({handleSubmit, handleChange, errors, touched}) => (
            <>
              {/* Custom TextInput Component for Taking User Input */}
              <CustomInput
                text="Enter your Name"
                iconName="create-sharp"
                customStyle={styles.custom}
                onChangeText={handleChange('name')}
              />
              {errors.name && touched.name && (
                // Custom ErrorComponent for Displaying Errors
                <ErrorComponent error={errors.name} />
              )}
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
                  <Text style={styles.text}>{selectedDate}</Text>
                </View>
              </TouchableWithoutFeedback>

              {selectedDate === 'Date of Birth' && dob && (
                <ErrorComponent error={'Date of birth is mandatory !'} />
              )}

              <CustomInput
                text="Enter the Email"
                iconName="mail"
                customStyle={styles.custom}
                onChangeText={handleChange('email')}
              />

              {errors.email && touched.email && (
                <ErrorComponent error={errors.email} />
              )}

              <CustomInput
                text="Enter Password"
                iconName="lock-open"
                customStyle={styles.custom}
                passEntry
                onChangeText={handleChange('pass')}
              />

              {errors.pass && touched.pass && (
                <ErrorComponent error={errors.pass} />
              )}

              <CustomInput
                text="Confirm Password"
                iconName="lock-open"
                customStyle={styles.custom}
                passEntry
                onChangeText={handleChange('confPass')}
              />

              {errors.confPass && touched.confPass && (
                <ErrorComponent error={errors.confPass} />
              )}

              <CustomInput
                text="Enter Phone no."
                iconName="call"
                customStyle={styles.custom}
                keyboardType={'numeric'}
                onChangeText={handleChange('phone')}
              />

              {errors.phone && touched.phone && (
                <ErrorComponent error={errors.phone} />
              )}

              <CustomInput
                text="Enter your Address"
                iconName="location-sharp"
                customStyle={styles.custom}
                onChangeText={handleChange('address')}
              />

              {errors.address && touched.address && (
                <ErrorComponent error={errors.address} />
              )}

              <CustomInput
                text="Your height"
                iconName="md-man"
                customStyle={styles.custom}
                onChangeText={handleChange('height')}
              />

              <CustomInput
                text="Your weight (in kgs)"
                iconName="medical"
                customStyle={styles.custom}
                onChangeText={handleChange('weight')}
              />

              <View
                style={{
                  height: DIM.height * 0.05,
                  width: DIM.width,
                  // backgroundColor: 'red',
                  paddingLeft: DIM.width * 0.1,
                }}>
                <Text
                  style={{
                    fontSize: 18,
                    color: 'slategrey',
                    letterSpacing: 2,
                  }}>
                  Any active membership?
                </Text>
              </View>

              <View style={styles.checkBoxContainer}>
                <MaterialCommunityIcons
                  name="dumbbell"
                  size={30}
                  color={'grey'}
                  style={styles.icon}
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: 'grey',
                  }}>
                  Gym?
                </Text>
                <CheckBox
                  disabled={false}
                  value={gym}
                  onValueChange={newvalue => setGym(newvalue)}
                  style={{
                    marginLeft: 10,
                  }}
                  tintColors={{true: COLORS.primary, false: COLORS.basic}}
                />
                <Text
                  style={{
                    fontSize: 20,
                    color: 'grey',
                    marginLeft: 60,
                  }}>
                  Pool?
                </Text>
                <CheckBox
                  disabled={false}
                  onValueChange={newvalue => setPool(newvalue)}
                  value={pool}
                  style={{
                    marginLeft: 10,
                  }}
                  tintColors={{true: COLORS.primary, false: COLORS.basic}}
                />
              </View>

              <Buttons
                text={'REGISTER'}
                inAppIcon={'account-plus'}
                iconName="angle-right"
                onPress={() => {
                  addSelectionToArray();
                  handleSubmit();
                  setDob(true);
                }}
              />
            </>
          )}
        </Formik>
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
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
    paddingTop: DIM.height * 0.05,
  },
  custom: {
    marginBottom: 10,
  },
  checkBoxContainer: {
    flexDirection: 'row',
    height: DIM.height * 0.1,
    width: DIM.width * 0.85,
    alignItems: 'center',
    backgroundColor: COLORS.slate,
    borderRadius: 15,
    paddingLeft: 20,
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
    height: DIM.height * 0.58,
    width: DIM.width * 0.95,
    backgroundColor: 'white',
    top: '25%',
    bottom: '25%',
    left: '3%',
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
    marginBottom: 10,
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
