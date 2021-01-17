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
    console.log("Offer params:", params);
    return (

        <View style={{ width: "100%", height: "100%" }}>
            <ScrollView>
                <TravelListItem
                    {...params}
                    price={map_values(params.price, 0, 100, 0, 3)}
                    panningEnabled
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