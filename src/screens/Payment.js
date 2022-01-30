import React, {useState} from 'react';
import {
  StyleSheet,
  StatusBar,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';

import {COLORS, DIM} from '../constants';

export default function Payment({navigation}) {
  const [searchBoxVisible, setSearchBoxVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={styles.threeBarStyle}>
          <Octicons name="three-bars" size={30} color={COLORS.primary} />
        </TouchableOpacity>

        {/* Whether the Search Box will be visible or not */}
        {!searchBoxVisible && (
          // Header changed as the theme color
          <View style={styles.headerMainContainer}>
            <View style={styles.headerTitleContainer}>
              <Text style={styles.headerTitle}>{'Payment'}</Text>
            </View>
          </View>
        )}

        {searchBoxVisible && (
          <View style={styles.searchBoxStyle}>
            <TextInput
              placeholder="Search"
              placeholderTextColor={'slategrey'}
              style={styles.textInputStyle}
            />
          </View>
        )}

        {/* Search Icon */}
        <TouchableOpacity
          onPress={() => setSearchBoxVisible(!searchBoxVisible)}
          style={styles.searchStyle}>
          <FontAwesome
            name={searchBoxVisible ? 'remove' : 'search'}
            size={30}
            color={COLORS.black}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: DIM.height * 0.01,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  header: {
    height: DIM.height * 0.1,
    width: DIM.width,
    flexDirection: 'row',
    // backgroundColor: 'red',
    alignItems: 'center',
    marginBottom: 2,
  },
  // Some Designs changed
  headerMainContainer: {
    width: '60%',
    height: '85%',
    backgroundColor: COLORS.primary,
    borderRadius: 100,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: COLORS.black,
    marginLeft: DIM.width * 0.05,
  },
  headerTitleContainer: {
    width: '90%',
    height: '100%',
    borderRadius: 100,
    backgroundColor: COLORS.lemon,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchStyle: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchBoxStyle: {
    width: '60%',
    height: '85%',
    justifyContent: 'center',
    borderRadius: 30,
    borderWidth: 1.2,
    borderColor: COLORS.black,
    backgroundColor: COLORS.slate,
    paddingLeft: 30,
  },
  textInputStyle: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  threeBarStyle: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleText: {
    marginTop: 10,
    fontSize: 23,
    color: '#2F4F4F',
    fontWeight: '800',
    letterSpacing: 2,
  },
});
