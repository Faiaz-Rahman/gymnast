import {useNavigationState} from '@react-navigation/native';
import React, {useState, useEffect, useCallback} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
  RefreshControl,
  ActivityIndicator,
  Modal,
  Image,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Octicons from 'react-native-vector-icons/Octicons';
import Card from '../components/Card';

import {COLORS, DIM} from '../constants';

export default function Home({navigation}) {
  let state = useNavigationState(state => state.index);

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };

  useEffect(() => {
    return () => {
      setSearchBoxVisible(false);
    };
  }, [state]);

  useEffect(() => {
    fetchPosts();
  }, [posts]);

  const [searchBoxVisible, setSearchBoxVisible] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showDetails, setShowDetails] = useState(false);
  const [item, setItem] = useState();

  const fetchPosts = async () => {
    const list = [];
    try {
      await firestore()
        .collection('owners')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            const {
              name,
              address,
              email,
              pass,
              state,
              city,
              szPool,
              len,
              brdth,
              image,
              mob,
              pan,
              gst,
              selectedDays,
            } = doc.data();
            list.push({
              id: doc.id,
              name,
              address,
              email,
              pass,
              state,
              city,
              szPool,
              len,
              brdth,
              image,
              mob,
              pan,
              gst,
              selectedDays,
            });
          });
        });
      setPosts(list);

      if (loading) setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchPosts();
    wait(3500).then(() => setRefreshing(false));
  }, []);

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
      {loading && (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      )}
      {!loading && (
        <>
          {showDetails && (
            <Modal
              animationType="slide"
              transparent
              onRequestClose={() => {
                // console.log('Modal Closed.');
                setShowDetails(false);
              }}>
              <View style={styles.modalStyle}>
                <ScrollView
                  contentContainerStyle={{
                    paddingBottom: 100,
                  }}>
                  <View style={styles.modalHeaderContainer}>
                    <Image
                      source={{uri: item.image}}
                      style={styles.modalImageStyle}
                    />
                    <View
                      style={{
                        // backgroundColor: 'green',
                        flex: 1,
                        paddingLeft: 15,
                      }}>
                      <Text style={styles.titleText}>Owner :</Text>
                      <Text style={styles.subTitleText}>{item.name}</Text>

                      <Text style={styles.titleText}>Location :</Text>
                      <Text style={styles.subTitleText}>{item.address}</Text>
                    </View>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      marginTop: 10,
                      marginLeft: 15,
                    }}>
                    <Text style={styles.underSubtext}>
                      {'Breadth of Pool: ' + item.brdth}
                    </Text>
                    <Text style={[styles.underSubtext, styles.custom]}>
                      {'Length of the Pool: ' + item.len}
                    </Text>
                    <Text style={[styles.underSubtext, styles.custom]}>
                      {'Contact Number: ' + item.mob}
                    </Text>
                    <Text style={[styles.underSubtext, styles.custom]}>
                      {'Available Days: '}
                    </Text>
                    {item.selectedDays.map((i, index) => {
                      return (
                        <View
                          style={{
                            flex: 1,
                            flexDirection: 'row',
                            // backgroundColor: 'green',
                            height: '10%',
                            width: '100%',
                            justifyContent: 'space-evenly',
                          }}
                          key={index}>
                          <Text
                            style={{
                              fontSize: 22,
                              color: 'grey',
                              fontWeight: '600',
                            }}>
                            {i}
                          </Text>
                        </View>
                      );
                    })}
                    <Text style={[styles.underSubtext, {marginTop: 25}]}>
                      {'Size of the Pool: ' + item.szPool}
                    </Text>
                  </View>
                </ScrollView>
              </View>
            </Modal>
          )}
          <ScrollView
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                colors={[COLORS.basic, 'blue', 'red', 'green']}
              />
            }
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              paddingBottom: 40,
              paddingTop: 10,
            }}>
            {posts.map((item, index) => {
              return (
                <Card
                  key={index}
                  item={item}
                  onPress={() => {
                    setShowDetails(true);
                    setItem(item);
                  }}
                />
              );
            })}
          </ScrollView>
        </>
      )}
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
  custom: {
    marginTop: 7,
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
  modalHeaderContainer: {
    height: '45%',
    width: '100%',
    paddingLeft: 15,
    // backgroundColor: 'purple',
    flexDirection: 'row',
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
  modalImageStyle: {
    height: '100%',
    width: '50%',
    borderRadius: 10,
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
  titleText: {
    marginTop: 10,
    fontSize: 23,
    color: '#2F4F4F',
    fontWeight: '800',
    letterSpacing: 2,
  },
  subTitleText: {
    fontSize: 17,
    color: '#2F4F4F',
    fontWeight: '600',
    letterSpacing: 1.2,
  },
  underSubtext: {
    fontSize: 18,
    color: '#2F4F4F',
    fontWeight: '800',
    letterSpacing: 2,
  },
});
