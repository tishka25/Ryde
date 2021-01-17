import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import Home from '../screens/Home';
import Chats from '../screens/Chats';
import Profile from '../screens/Profile';
import Icon from 'react-native-vector-icons/FontAwesome';
import Chat from '../screens/Chat';
import TravelList from './TravelList';
import Offer from '../screens/Offer';

const Stack = createStackNavigator();


const Tab = createBottomTabNavigator();
const { Navigator, Screen } = Tab;


const ChatsRoot = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen name={"Requests"} component={Chats} />
            <Stack.Screen name={"Chat"} component={Chat} />
            {/* <Stack.Screen /> */}
        </Stack.Navigator>
    );
}

const OffersRoot = () => {
    return (
        <Stack.Navigator
            initialRouteName={"Home"}
        >
            <Stack.Screen
                name={"Home"}
                component={Home}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name={"Offer"} component={Offer} />
        </Stack.Navigator>
    )
}


const MainNavigationStack = () => {
    return (
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
                name="OffersRoot"
                component={OffersRoot}
                options={{
                    tabBarLabel: "Home",
                    showIcon: true,
                    tabBarIcon: ({ color }) => {
                        return <Icon name="road" size={24} color={color} />
                    }
                }}
            />
            <Screen name="ChatsRoot" component={ChatsRoot}
                options={{
                    tabBarLabel: "Requests",
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
    )
}

export default MainNavigationStack;