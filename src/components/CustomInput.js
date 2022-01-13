import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity, View} from 'react-native';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {COLORS, DIM} from '../constants';

export default function CustomInput({
  iconName = null,
  text,
  passEntry = null,
  customStyle,
  onChangeText,
  keyboardType = 'email-address',
  onFocus = null,
}) {
  const [hide, setHide] = useState(true);

  if (passEntry === null) {
    return (
      <View style={[styles.textInputContainer, customStyle]}>
        <Ionicons
          name={iconName}
          size={30}
          color={'grey'}
          style={styles.icon}
        />
        <TextInput
          placeholder={text}
          placeholderTextColor={'grey'}
          style={styles.textInput}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          onFocus={onFocus}
        />
      </View>
    );
  } else {
    return (
      <View style={[styles.textInputContainer, customStyle]}>
        <Ionicons
          name={iconName}
          size={30}
          color={'grey'}
          style={styles.icon}
        />
        <TextInput
          placeholder={text}
          placeholderTextColor={'grey'}
          style={styles.textInput}
          secureTextEntry={hide ? true : false}
          onChangeText={onChangeText}
          onFocus={onFocus}
        />
        <TouchableOpacity onPress={() => setHide(!hide)}>
          <Ionicons
            name={hide ? 'eye' : 'eye-off'}
            size={30}
            color={'grey'}
            style={{
              marginRight: 15,
            }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 14,
  },
  textInputContainer: {
    flexDirection: 'row',
    height: DIM.height * 0.1,
    width: DIM.width * 0.85,
    alignItems: 'center',
    backgroundColor: COLORS.slate,
    borderRadius: 15,
    paddingLeft: 20,
  },
  textInput: {
    flex: 1,
    fontSize: 17,
    fontWeight: '600',
    fontStyle: 'italic',
    letterSpacing: 1.5,
    color: 'grey',
  },
});
