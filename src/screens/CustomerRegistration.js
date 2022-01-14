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
import CalendarPicker from 'react-native-calendar-picker';
import {Formik} from 'formik';
import * as yup from 'yup';

import CustomInput from '../components/CustomInput';

import {COLORS, DIM} from '../constants';
import Buttons from '../components/Buttons';

export default function CustomerRegistration() {
  const [selectedDate, setSelectedDate] = useState('Date of Birth');

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
    phone: yup.string().required('Phone Number is required !'),
    address: yup.string().required('Address is required !'),
  });

  const [calOpen, setCalOpen] = useState(false);
  return (
    <>
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
                // console.log(month, datetime, year);
                setSelectedDate(month + ' ' + datetime + ', ' + year);
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
              scrollable
              height={DIM.height * 0.55}
              width={DIM.width * 0.87}
            />
          </View>
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
        <Formik
          initialValues={{
            name: '',
            dob: '',
            email: '',
            pass: '',
            confPass: '',
            phone: '',
            address: '',
          }}
          validationSchema={validationSchema}
          onSubmit={values => console.log(values)}>
          {({handleSubmit, handleChange, errors, values, touched}) => (
            <>
              <CustomInput
                text="Enter your Name"
                iconName="create-sharp"
                customStyle={styles.custom}
                onChangeText={handleChange('name')}
              />
              {errors.name && touched.name && (
                <View>
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontSize: 15,
                      fontWeight: '600',
                      paddingBottom: 10,
                    }}>
                    {errors.name}
                  </Text>
                </View>
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
              <CustomInput
                text="Enter the Email"
                iconName="mail"
                customStyle={styles.custom}
                onChangeText={handleChange('email')}
              />
              {errors.email && touched.email && (
                <View>
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontSize: 15,
                      fontWeight: '600',
                      paddingBottom: 10,
                    }}>
                    {errors.email}
                  </Text>
                </View>
              )}
              <CustomInput
                text="Enter Password"
                iconName="lock-open"
                customStyle={styles.custom}
                passEntry
                onChangeText={handleChange('pass')}
              />
              {errors.pass && touched.pass && (
                <View>
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontSize: 15,
                      fontWeight: '600',
                      paddingBottom: 10,
                    }}>
                    {errors.pass}
                  </Text>
                </View>
              )}
              <CustomInput
                text="Confirm Password"
                iconName="lock-open"
                customStyle={styles.custom}
                passEntry
                onChangeText={handleChange('confPass')}
              />
              {errors.confPass && touched.confPass && (
                <View>
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontSize: 15,
                      fontWeight: '600',
                      paddingBottom: 10,
                    }}>
                    {errors.confPass}
                  </Text>
                </View>
              )}
              <CustomInput
                text="Enter Phone no."
                iconName="call"
                customStyle={styles.custom}
                keyboardType={'numeric'}
                onChangeText={handleChange('phone')}
              />
              {errors.phone && touched.phone && (
                <View>
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontSize: 15,
                      fontWeight: '600',
                      paddingBottom: 10,
                    }}>
                    {errors.phone}
                  </Text>
                </View>
              )}
              <CustomInput
                text="Enter your Address"
                iconName="location-sharp"
                customStyle={{marginBottom: 15}}
                onChangeText={handleChange('address')}
              />
              {errors.address && touched.address && (
                <View>
                  <Text
                    style={{
                      color: COLORS.primary,
                      fontSize: 15,
                      fontWeight: '600',
                      paddingBottom: 10,
                    }}>
                    {errors.address}
                  </Text>
                </View>
              )}
              <Buttons
                text={'REGISTER'}
                inAppIcon={'account-plus'}
                iconName="angle-right"
                onPress={handleSubmit}
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
    paddingTop: 40,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  custom: {
    marginBottom: 10,
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
