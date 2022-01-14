import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import {COLORS, DIM} from '../constants';

import Ionicons from 'react-native-vector-icons/Ionicons';

import {Formik} from 'formik';
import * as yup from 'yup';
import CustomInput from '../components/CustomInput';
import Buttons from '../components/Buttons';

export default function OwnerRegistration() {
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
    address: yup.string().required('Address is mandatory !'),
    szPool: yup.string().required('Pool Measurement is mandatory !'),
    len: yup.string().required('Length of Pool is mandatory !'),
    brdth: yup.string().required('Breadth of Pool is mandatory !'),
    depthPool: yup.string().required('Depth of Pool is mandatory !'),
    image: yup.string().required('Upload an image !'),
    fees: yup.string().required('Mention fees'),
    mob: yup.string().required('Mobile number is mandatory !'),
    pan: yup.string().required('Provide the PAN number !'),
    gst: yup.string().required('Provide the GST number !'),
  });

  return (
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
        Pool Owner Registration
      </Text>
      <Formik
        initialValues={{
          name: '',
          address: '',
          email: '',
          pass: '',
          confPass: '',
          state: '',
          city: '',
          szPool: '',
          len: '',
          brdth: '',
          depthPool: '',
          image: '',
          days: '',
          timing: '',
          fees: '',
          mob: '',
          pan: '',
          gst: '',
        }}
        validationSchema={validationSchema}>
        {({handleSubmit, handleChange, values, touched, errors}) => (
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
            <CustomInput
              text="Enter your Address"
              iconName="location-sharp"
              customStyle={styles.custom}
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
            <CustomInput
              text="Enter your State"
              iconName="pin-sharp"
              customStyle={styles.custom}
              onChangeText={handleChange('state')}
            />
            {errors.state && touched.state && (
              <View>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 15,
                    fontWeight: '600',
                    paddingBottom: 10,
                  }}>
                  {errors.state}
                </Text>
              </View>
            )}
            <CustomInput
              text="Enter your City"
              iconName="md-pin"
              customStyle={styles.custom}
              onChangeText={handleChange('city')}
            />
            {errors.city && touched.city && (
              <View>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 15,
                    fontWeight: '600',
                    paddingBottom: 10,
                  }}>
                  {errors.city}
                </Text>
              </View>
            )}
            <CustomInput
              text="Enter Email address"
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
              text="Enter password"
              iconName="lock-open"
              customStyle={styles.custom}
              onChangeText={handleChange('pass')}
              passEntry
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
              text="Confirm password"
              iconName="lock-open"
              customStyle={styles.custom}
              onChangeText={handleChange('confPass')}
              passEntry
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
              text="Size of Pool"
              iconName="snow-outline"
              customStyle={styles.custom}
              onChangeText={handleChange('szPool')}
            />
            {errors.szPool && touched.szPool && (
              <View>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 15,
                    fontWeight: '600',
                    paddingBottom: 10,
                  }}>
                  {errors.szPool}
                </Text>
              </View>
            )}

            <CustomInput
              text="Length of Pool"
              iconName="ios-ellipse-outline"
              customStyle={styles.custom}
              onChangeText={handleChange('len')}
            />
            {errors.len && touched.len && (
              <View>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 15,
                    fontWeight: '600',
                    paddingBottom: 10,
                  }}>
                  {errors.len}
                </Text>
              </View>
            )}

            <CustomInput
              text="Breadth of Pool"
              iconName="ios-ellipse-outline"
              customStyle={styles.custom}
              onChangeText={handleChange('brdth')}
            />
            {errors.brdth && touched.brdth && (
              <View>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 15,
                    fontWeight: '600',
                    paddingBottom: 10,
                  }}>
                  {errors.brdth}
                </Text>
              </View>
            )}
            <View>
              <View style={styles.textContainer}>
                <Ionicons
                  name="image"
                  size={33}
                  color={'grey'}
                  style={styles.icon}
                />
                <Text style={styles.text}>Choose an image</Text>
                <TouchableOpacity
                  style={{
                    marginLeft: 30,
                    height: DIM.height * 0.05,
                    width: DIM.width * 0.2,
                    backgroundColor: COLORS.basic,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 14,
                    elevation: 5,
                  }}>
                  <Text
                    style={{
                      color: COLORS.white,
                      fontSize: 16,
                      fontWeight: '700',
                    }}>
                    Upload
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <CustomInput
              text="Enter phone number"
              iconName="call"
              customStyle={styles.custom}
              onChangeText={handleChange('call')}
              keyboardType="numeric"
            />
            {errors.call && touched.call && (
              <View>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 15,
                    fontWeight: '600',
                    paddingBottom: 10,
                  }}>
                  {errors.call}
                </Text>
              </View>
            )}
            <CustomInput
              text="Enter PAN number"
              iconName="md-alert"
              customStyle={styles.custom}
              onChangeText={handleChange('pan')}
            />
            {errors.pan && touched.pan && (
              <View>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 15,
                    fontWeight: '600',
                    paddingBottom: 10,
                  }}>
                  {errors.pan}
                </Text>
              </View>
            )}

            <CustomInput
              text="Enter GST number"
              iconName="md-alert"
              customStyle={{marginBottom: 25}}
              onChangeText={handleChange('gst')}
            />
            {errors.gst && touched.gst && (
              <View>
                <Text
                  style={{
                    color: COLORS.primary,
                    fontSize: 15,
                    fontWeight: '600',
                    paddingBottom: 10,
                  }}>
                  {errors.gst}
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
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 50,
  },
  custom: {
    marginBottom: 10,
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
    marginLeft: 15,
  },
});
