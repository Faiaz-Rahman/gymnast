import React, {useState, useEffect, useContext} from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

import ImagePicker from 'react-native-image-crop-picker';
import {Formik} from 'formik';
import * as yup from 'yup';

import CheckBox from '@react-native-community/checkbox';

import {COLORS, DIM} from '../constants';

import CustomInput from '../components/CustomInput';
import Buttons from '../components/Buttons';
import ErrorComponent from '../components/ErrorComponent';
import Logo from '../components/Logo';
import {AuthContext} from '../navigation/AuthProvider';

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
    state: yup.string(),
    city: yup.string(),
    address: yup.string().required('Address is mandatory !'),
    szPool: yup.string().required('Pool Measurement is mandatory !'),
    len: yup.string().required('Length of Pool is mandatory !'),
    brdth: yup.string().required('Breadth of Pool is mandatory !'),
    mob: yup
      .string()
      .min(9, 'Phone number is of 9 digits')
      .max(9, 'Phone number is of 9 digits')
      .required('Mobile number is mandatory !'),
    pan: yup.string().required('Provide the PAN number !'),
    gst: yup.string().required('Provide the GST number !'),
  });

  // AuthContext's used to call the following functions
  const {logout, ownerRegister} = useContext(AuthContext);

  const [image, setImage] = useState(null);

  const [sat, setSat] = useState(false);
  const [sun, setSun] = useState(false);
  const [mon, setMon] = useState(false);
  const [tue, setTue] = useState(false);
  const [wed, setWed] = useState(false);
  const [thu, setThu] = useState(false);
  const [fri, setFri] = useState(false);

  const [imagePickerOpened, setImagePickerOpened] = useState(false);

  const selectedDays = [];

  const [daysError, setDaysError] = useState(false);
  const [uploading, setUploading] = useState(null);
  const [transferred, setTransferred] = useState(0);

  const addDaysToArray = () => {
    if (sat) selectedDays.push('sat');
    if (sun) selectedDays.push('sun');
    if (mon) selectedDays.push('mon');
    if (tue) selectedDays.push('tue');
    if (wed) selectedDays.push('wed');
    if (thu) selectedDays.push('thu');
    if (fri) selectedDays.push('fri');
  };

  useEffect(() => {
    return () => {
      setImage(null);
    };
  }, []);

  // Image Picker is set
  const chooseImageFromLibrary = () => {
    setImagePickerOpened(true);

    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
    })
      .then(image => {
        const imageUri = image.path;
        setImage(imageUri);
      })
      .catch(() => {
        setImage(null);
      });
  };

  //  Uploading Image to firebase and extracting download URL for
  //  Firestore
  const uploadImage = async image => {
    if (image) {
      const uploadUri = image;
      let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

      setUploading(true);
      setTransferred(0);

      // Using Storage Reference photos
      const storageRef = storage().ref(`photos/${filename}`);
      const task = storageRef.putFile(uploadUri);

      task.on('state_changed', taskSnapshot => {
        setTransferred(
          Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
            100,
        );
      });

      try {
        await task;

        const url = await storageRef.getDownloadURL();

        setUploading(false);

        return url;
      } catch (error) {
        console.log(error);
        return null;
      }
    } else return '';
  };

  // Adds the link to firebase < image > tag
  const addImageToFirestore = async () => {
    const link_for_upload = await uploadImage(image);
    const uid = auth().currentUser.uid.toString();

    await firestore()
      .collection('owners')
      .doc(uid)
      .update({
        image: link_for_upload,
      })
      .then(() => console.log('Data updated!'))
      .catch(e => console.log(e));

    await logout();
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}>
      <Logo />
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

      {/* Formik form schema && validation */}

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
          mob: '',
          pan: '',
          gst: '',
        }}
        validationSchema={validationSchema}
        onSubmit={({
          name,
          address,
          email,
          pass,
          confPass,
          state,
          city,
          szPool,
          len,
          brdth,
          mob,
          pan,
          gst,
        }) => {
          ownerRegister(
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
          );

          // Attaching the image link to firestore ...
          addImageToFirestore();
        }}>
        {({handleSubmit, handleChange, touched, errors}) => (
          <>
            <CustomInput
              text="Enter your Full Name"
              iconName="create-sharp"
              customStyle={styles.custom}
              onChangeText={handleChange('name')}
            />
            {errors.name && touched.name && (
              <ErrorComponent error={errors.name} />
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
              text="Enter your State"
              iconName="pin-sharp"
              customStyle={styles.custom}
              onChangeText={handleChange('state')}
            />
            {errors.state && touched.state && (
              <ErrorComponent error={errors.state} />
            )}

            <CustomInput
              text="Enter your City"
              iconName="md-pin"
              customStyle={styles.custom}
              onChangeText={handleChange('city')}
            />
            {errors.city && touched.city && (
              <ErrorComponent error={errors.city} />
            )}

            <CustomInput
              text="Enter Email address"
              iconName="mail"
              customStyle={styles.custom}
              onChangeText={handleChange('email')}
            />
            {errors.email && touched.email && (
              <ErrorComponent error={errors.email} />
            )}

            <CustomInput
              text="Enter password"
              iconName="lock-open"
              customStyle={styles.custom}
              onChangeText={handleChange('pass')}
              passEntry
            />
            {errors.pass && touched.pass && (
              <ErrorComponent error={errors.pass} />
            )}

            <CustomInput
              text="Confirm password"
              iconName="lock-open"
              customStyle={styles.custom}
              onChangeText={handleChange('confPass')}
              passEntry
            />
            {errors.confPass && touched.confPass && (
              <ErrorComponent error={errors.confPass} />
            )}

            <CustomInput
              text="Size of Pool"
              iconName="snow-outline"
              customStyle={styles.custom}
              onChangeText={handleChange('szPool')}
            />
            {errors.szPool && touched.szPool && (
              <ErrorComponent error={errors.szPool} />
            )}

            <CustomInput
              text="Length of Pool"
              iconName="ios-ellipse-outline"
              customStyle={styles.custom}
              onChangeText={handleChange('len')}
            />
            {errors.len && touched.len && <ErrorComponent error={errors.len} />}

            <CustomInput
              text="Breadth of Pool"
              iconName="ios-ellipse-outline"
              customStyle={styles.custom}
              onChangeText={handleChange('brdth')}
            />
            {errors.brdth && touched.brdth && (
              <ErrorComponent error={errors.brdth} />
            )}

            <CustomInput
              text="Enter phone number"
              iconName="call"
              customStyle={styles.custom}
              onChangeText={handleChange('mob')}
              keyboardType="numeric"
            />
            {errors.mob && touched.mob && <ErrorComponent error={errors.mob} />}

            <CustomInput
              text="Enter PAN number"
              iconName="md-alert"
              customStyle={styles.custom}
              onChangeText={handleChange('pan')}
            />
            {errors.pan && touched.pan && <ErrorComponent error={errors.pan} />}

            <CustomInput
              text="Enter GST number"
              iconName="md-alert"
              customStyle={styles.custom}
              onChangeText={handleChange('gst')}
            />
            {errors.gst && touched.gst && <ErrorComponent error={errors.gst} />}

            <View style={styles.imagePickerContainer}>
              <TouchableOpacity
                onPress={chooseImageFromLibrary}
                style={styles.imagePickerStyle}>
                <Image
                  source={
                    image === null
                      ? require('../assets/camera.png')
                      : {uri: image}
                  }
                  style={styles.imagePickerImage}
                />
              </TouchableOpacity>
              <View style={styles.uploadImageContainer}>
                <Text style={styles.uploadImageText}>Upload an Image</Text>
              </View>
            </View>
            {image === null && imagePickerOpened && (
              <ErrorComponent error="You must upload an image !" />
            )}

            <View style={styles.selectDaysContainer}>
              <Text style={styles.selectDaysText}>Select Days</Text>
              <View style={styles.daysPicker}>
                <View style={{}}>
                  <Text style={styles.dayText}>Sat</Text>
                  <CheckBox
                    disabled={false}
                    onValueChange={newvalue => {
                      setSat(newvalue);
                    }}
                    value={sat}
                    tintColors={{true: COLORS.primary, false: COLORS.basic}}
                  />
                </View>
                <View>
                  <Text style={styles.dayText}>Sun</Text>
                  <CheckBox
                    disabled={false}
                    onValueChange={newvalue => {
                      setSun(newvalue);
                    }}
                    value={sun}
                    tintColors={{true: COLORS.primary, false: COLORS.basic}}
                  />
                </View>
                <View>
                  <Text style={styles.dayText}>Mon</Text>
                  <CheckBox
                    disabled={false}
                    onValueChange={newvalue => {
                      setMon(newvalue);
                    }}
                    value={mon}
                    tintColors={{true: COLORS.primary, false: COLORS.basic}}
                  />
                </View>
                <View>
                  <Text style={styles.dayText}>Tue</Text>
                  <CheckBox
                    disabled={false}
                    onValueChange={newvalue => {
                      setTue(newvalue);
                    }}
                    value={tue}
                    tintColors={{true: COLORS.primary, false: COLORS.basic}}
                  />
                </View>
                <View>
                  <Text style={styles.dayText}>Wed</Text>
                  <CheckBox
                    disabled={false}
                    onValueChange={newvalue => {
                      setWed(newvalue);
                    }}
                    value={wed}
                    tintColors={{true: COLORS.primary, false: COLORS.basic}}
                    ontintColor={COLORS.primary}
                  />
                </View>
                <View>
                  <Text style={styles.dayText}>Thu</Text>
                  <CheckBox
                    disabled={false}
                    onValueChange={newvalue => {
                      setThu(newvalue);
                    }}
                    value={thu}
                    tintColors={{true: COLORS.primary, false: COLORS.basic}}
                  />
                </View>
                <View>
                  <Text style={styles.dayText}>Fri</Text>
                  <CheckBox
                    disabled={false}
                    onValueChange={newvalue => {
                      setFri(newvalue);
                    }}
                    value={fri}
                    tintColors={{true: COLORS.primary, false: COLORS.basic}}
                  />
                </View>
              </View>
            </View>
            {daysError && <ErrorComponent error="You need to select days !" />}

            <Buttons
              text={'REGISTER'}
              inAppIcon={'account-plus'}
              iconName="angle-right"
              onPress={() => {
                //Add days to the array after calling this function

                addDaysToArray();
                if (!imagePickerOpened) {
                  setImagePickerOpened(true);
                }
                if (!selectedDays.length) {
                  setDaysError(true);
                } else {
                  setDaysError(false);
                }
                handleSubmit();
              }}
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
    paddingTop: DIM.height * 0.05,
  },
  custom: {
    marginBottom: 10,
  },
  dayText: {
    fontWeight: '900',
    fontSize: 19,
  },
  daysPicker: {
    flexDirection: 'row',
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  imagePickerContainer: {
    flexDirection: 'row',
    marginLeft: DIM.width * 0.1,
    marginBottom: 15,
  },
  imagePickerImage: {
    height: '90%',
    width: '90%',
  },
  imagePickerStyle: {
    height: 150,
    width: DIM.width * 0.4,
    alignSelf: 'flex-start',
    borderRadius: 10,
    backgroundColor: COLORS.slate,
    justifyContent: 'center',
    alignItems: 'center',
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
  selectDaysContainer: {
    width: DIM.width,
    height: DIM.height * 0.15,
    // backgroundColor: 'tomato',
    paddingLeft: DIM.width * 0.07,
    paddingTop: DIM.height * 0.01,
  },
  selectDaysText: {
    fontWeight: '900',
    fontSize: 20,
    letterSpacing: 2,
    // fontStyle: 'italic',
    color: 'slategrey',
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
  uploadImageContainer: {
    height: 150,
    width: DIM.width * 0.55,
    justifyContent: 'center',
  },
  uploadImageText: {
    marginLeft: DIM.width * 0.06,
    fontSize: 17,
    fontWeight: '600',
    letterSpacing: 1.2,
    color: 'slategrey',
    fontStyle: 'italic',
  },
});
