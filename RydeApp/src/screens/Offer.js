import * as React from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    Button,
} from 'react-native';

import PropTypes from "prop-types";
import TravelListItem from "../components/TravelListItem";
import { map_values } from "../utils/utils";
import userHandler from "../utils/userHandler";
import requestHandler from "../utils/requestHandler";
import { navigate } from "../utils/rootNavigation";


const propTypes = {
    messages: PropTypes.arrayOf(PropTypes.exact({
        "id": PropTypes.number,
        "content": PropTypes.string,
        "timeSent": PropTypes.any,
        "senderId": PropTypes.number,
        "requestId": PropTypes.number
    })).isRequired,
}


const Offer = ({ navigation, route }) => {

    const params = route.params;

    const user = userHandler.getUser()


    console.log("User:", user, params);

    // {
    //     "luggage": 2,
    //     "capacity": 2,
    //     "user": {
    //         id: 1
    //     },
    //     "offerId": 1
    // }

    async function handleRequestRyde(){
        const data = {
            luggage: params.luggage,
            capacity: params.capacity,
            user: {
                id: user.id
            },
            offerId: params.id
        }
        console.log("Data to send:", data);
        await requestHandler("request", "create", data);
        navigate("ChatsRoot", { screen: "Requests" });
    }



    return (

        <View style={{ width: "100%", height: "100%" }}>
            <ScrollView>
                <TravelListItem
                    {...params}
                    price={map_values(params.price, 0, 100, 0, 3)}
                    panningEnabled
                    height={800}
                />
            </ScrollView>
            <SafeAreaView style={styles.contactContainer}>
                <Button title={"Request ryde"} color={"#987bf3"} onPress={handleRequestRyde}/>
            </SafeAreaView>
        </View>

    );
}

Offer.propTypes = propTypes;

const styles = StyleSheet.create({
    contactContainer: {
        flex: 1,
        flexDirection: "column",
        position: "absolute",
        alignSelf: "center",
        bottom: 8,
        width: "95%"
    }
});


export default Offer;