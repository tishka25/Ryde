/**
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import {
  StyleSheet,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

import Home from '../screens/Home';
import Chats from '../screens/Chats';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import Chat from '../screens/Chat';


const Tab = createBottomTabNavigator();
const { Navigator, Screen } = Tab;

const Stack = createStackNavigator();

const ChatsRoot = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={"Chats"} component={Chats} />
      <Stack.Screen name={"Chat"} component={Chat} />
      {/* <Stack.Screen /> */}
    </Stack.Navigator>
  );
}


const App: () => React$Node = () => {

  return (
    <NavigationContainer>
      <Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: "#987bf3",
          inactiveTintColor: "#dedede",
          keyboardHidesTabBar: true,
          style: {
            backgroundColor: "#151415",
            padding: 4,
            height: 48
          }
        }}
      >
        <Screen
          name="Home"
          component={Home}
          options={{
            showIcon: true,
            tabBarIcon: ({ color }) => {
              return <Icon name="road" size={24} color={color} />
            }
          }}
        />
        <Screen name="ChatsRoot" component={ChatsRoot}
          options={{
            tabBarLabel: "Chats",
            showIcon: true,
            tabBarIcon: ({ color }) => {
              return <Icon name="comments" size={24} color={color} />
            }
          }}
        />
        <Screen name="Profile" component={Profile}
          options={{
            showIcon: true,
            tabBarIcon: ({ color }) => {
              return <Icon name="user" size={24} color={color} />
            }
          }}
        />


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
