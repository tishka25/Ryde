
import React from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import TravelList from '../components/TravelList';


const Home = () => {
    return (
        <SafeAreaView style={{}}>
            <StatusBar barStyle="dark-content" />
            <View style={{ width: "100%", height: "100%" }}>
                <TravelList></TravelList>
            </View>

        </SafeAreaView>
    );
}


export default Home;