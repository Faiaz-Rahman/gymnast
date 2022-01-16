import {Dimensions} from 'react-native';

export const DIM = {
  height: Dimensions.get('window').height,
  width: Dimensions.get('window').width,
};

export const COLORS = {
  black: '#000',
  white: '#fff',
  primary: '#f02c20',
  lemon: '#fff44f',
  slate: '#D6DFE0',
  basic: '#d8136b',
};

export const IMAGEURI = require('../assets/camera.png');

export const Data = [
  {
    id: 1,
    uri: 'https://media.istockphoto.com/photos/traditional-design-swimming-pool-for-tourists-at-the-hotel-against-picture-id1300663577?b=1&k=20&m=1300663577&s=170667a&w=0&h=mYCYF3ws3iuhtrCvmFFjE4_hajUNYwYvlIrmFvJXSZk=',
    owner: 'Owner 1',
  },
  {
    id: 2,
    uri: 'https://media-cdn.tripadvisor.com/media/photo-m/1280/1a/bb/7d/92/photo0jpg.jpg',
    owner: 'Owner 2',
  },
  {
    id: 3,
    uri: 'https://www.thespruce.com/thmb/850I_c1jz_5Z_UHWuLkHunYRzEo=/1820x1365/smart/filters:no_upscale()/the-main-types-of-inground-pools-2736828-hero-8da2d1986bcc4f01a857e7a015a3f3e1.jpg',
    owner: 'Owner 3',
  },
  {
    id: 4,
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhXl4da80TXJcNx-BMlc4shNuv0XY88UCXmwPQH29LQBC7Pf7zxmUdL9HjgNd897-bmWg&usqp=CAU',
    owner: 'Owner 4',
  },
  {
    id: 5,
    uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHXduSjry0DTVNxm01VG7Vg1g-qP-nDYa1X_4seqvzn7KaPHgwrCDeON_9PjbBv8HSmnM&usqp=CAU',
    owner: 'Owner 5',
  },
];
