import {useNavigationState} from '@react-navigation/native';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Card from '../components/Card';

import {COLORS, DIM, Data} from '../constants';

export default function Home({navigation}) {
  let state = useNavigationState(state => state.index);

  useEffect(() => {
    return () => {
      setSearchBoxVisible(false);
    };
  }, [state]);

  const [searchBoxVisible, setSearchBoxVisible] = useState(false);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={COLORS.white} />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.toggleDrawer()}
          style={styles.threeBarStyle}>
          <Octicons name="three-bars" size={30} color={COLORS.black} />
        </TouchableOpacity>

        {!searchBoxVisible && (
          <View style={styles.headerTitleContainer}>
            <Text style={styles.headerTitle}>{'Feed'}</Text>
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

        <TouchableOpacity
          onPress={() => setSearchBoxVisible(!searchBoxVisible)}
          style={styles.searchStyle}>
          <FontAwesome name="search" size={30} color={COLORS.black} />
        </TouchableOpacity>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingBottom: 40,
          paddingTop: 10,
        }}>
        {Data.map((item, index) => {
          return <Card key={index} item={item} />;
        })}
      </ScrollView>
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
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.black,
  },
  headerTitleContainer: {
    width: '60%',
    height: '85%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    backgroundColor: COLORS.slate,
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
});
