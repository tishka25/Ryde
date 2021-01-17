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


const data = {
    userInfo: {
        firstName: "Teodor",
        lastName: "Stanishev",
        rating: 2,
        profilePicture: "https://reactnative.dev/img/tiny_logo.png"
    },
    travelPoints: {
        startPoint: [23.322263, 42.683654],
        finishPoint: [24.731604, 42.141570],
        startLocationName: "Sofia",
        finishLocationName: "Plovdiv"
    },
    departure: "Tue Jan 12 2021 20:30:59",
    bags: 3,
    price: 2,
    people: 2,
    description: "Някакъв голям description на водача който ще кара. Колко бързо кара.Може нещо забавно да бъде. Свободен текст се пише тук."
}



const propTypes = {
    messages: PropTypes.arrayOf(PropTypes.exact({
        "id": PropTypes.number,
        "content": PropTypes.string,
        "timeSent": PropTypes.any,
        "senderId": PropTypes.number,
        "requestId": PropTypes.number
    })).isRequired,
}


const Offer = ({ }) => {

    return (

        <View style={{ width: "100%", height: "100%" }}>
            <ScrollView>
                <TravelListItem
                    userInfo={data.userInfo}
                    travelPoints={data.travelPoints}
                    departure={data.departure}
                    luggage={data.bags}
                    price={data.price}
                    people={data.people}
                    description={data.description}
                    height={600}
                />
            </ScrollView>
            <SafeAreaView style={styles.contactContainer}>
                <Button title={"Request ryde"} color={"#987bf3"}/>
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