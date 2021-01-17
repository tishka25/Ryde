/**
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, { useEffect, useRef } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {
  LogBox,
  StyleSheet,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import Register from '../screens/Register';
import Login from '../screens/Login';
import MainNavigationStack from './MainNavigationStack';
import { navigate, navigationRef } from '../utils/rootNavigation';
import userHandler from '../utils/userHandler';



const Stack = createStackNavigator();



const App: () => React$Node = () => {
  //Disable logs in app
  LogBox.ignoreAllLogs(true);
  //

  useEffect(()=>{
    //Load User data
    userHandler.init();
    //
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator mode="modal" headerMode="none">
        <Stack.Screen name={"Main"} component={MainNavigationStack} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
      </Stack.Navigator>
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
