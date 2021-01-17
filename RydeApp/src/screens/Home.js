
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import TravelList from '../components/TravelList';
import requestHandler from '../utils/requestHandler';


const Home = (props) => {

    const [offers, setOffers] = useState([]);

    async function loadOffers(){
        // console.log(offers)
        // console.log(requestHandler("offer", "getAll"))
        const response = await requestHandler("offer", "getAll");
        // console.log("Offers:", response);
        setOffers(response);
    }

    
    useEffect(()=>{
        if(offers.length < 1){
            loadOffers();
        }
    }, []);

    return (
        <SafeAreaView style={{}}>
            <StatusBar barStyle="dark-content" />
            <View style={{ width: "100%", height: "100%" }}>
                <TravelList {...props} offers={offers}/>
            </View>

        </SafeAreaView>
    );
}


export default Home;