
import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import TravelList from '../components/TravelList';
import requestHandler from '../utils/requestHandler';
import Icon from 'react-native-vector-icons/FontAwesome';
import { navigate } from '../utils/rootNavigation';


const Home = (props) => {

    const [offers, setOffers] = useState([]);

    async function loadOffers() {
        // console.log(offers)
        // console.log(requestHandler("offer", "getAll"))
        const response = await requestHandler("offer", "getAll");
        console.log("Offers:", response);
        setOffers(response);
    }


    useEffect(() => {
        if (offers.length < 1) {
            loadOffers();
        }
    }, [loadOffers]);

    function renderHeader() {
        return (
            <View style={{ width: "100%", height: 80 }}>
                <View style={styles.searchBoxContainer}>
                    <TextInput placeholder="Search" placeholderTextColor="#666" style={styles.searchBox} />
                </View>
            </View>
        );
    }

    return (
        <SafeAreaView style={{}}>
            <StatusBar barStyle="dark-content" />
            <View style={{ width: "100%", height: "100%" }}>

                <TravelList {...props} offers={offers} header={renderHeader()} />
                {/* Add ofer */}
                <View style={styles.addOfferContainer}>
                    <TouchableOpacity onPress={() => navigate("CreateOffer")}>
                        <Icon name={"plus"} size={24} color={"white"} />
                    </TouchableOpacity>
                </View>
                {/*  */}
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    addOfferContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        position: "absolute",
        bottom: 8,
        right: 8,
        width: 58,
        height: 58,
        borderRadius: 100,
        backgroundColor: "#987bf3",
        elevation: 10,
    },
    searchBoxContainer: {
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 4,
        marginVertical: 14,
        // marginTop: 14,
        width: "95%",
        flexDirection: "row",
        alignSelf: "center"
    },
    searchBox: {
        padding: 12,
        paddingLeft: 20,
        paddingTop: 14,

    },
});


export default Home;