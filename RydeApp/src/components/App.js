/**
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  StyleSheet,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import { Block, Card, theme } from 'galio-framework';
import MapView from './MapView';
import TravelList from './TravelList';
import Home from '../screens/Home';
import Chat from '../screens/Chat';
import Profile from '../screens/Profile';


const Tab = createBottomTabNavigator();
const { Navigator, Screen } = Tab;


const App: () => React$Node = () => {

  return (
    <NavigationContainer>
      <Navigator>
        <Screen name="Home" component={Home}/>
        <Screen name="Chat" component={Chat}/>
        <Screen name="Profile" component={Profile}/>

      </Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
