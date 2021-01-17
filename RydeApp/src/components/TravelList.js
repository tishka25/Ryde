import { Block } from 'galio-framework';
import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import PropTypes from "prop-types";
import TravelListItem from './TravelListItem';
import { TouchableOpacity } from 'react-native-gesture-handler';

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

const TravelList = (props) => {
    const { navigation } = props;


    
    function navigateToOffer() {
        try {
            navigation.navigate("OffersRoot", { screen: "Offer" })
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <View style={{ flex: 1 }}>

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.listContainer}
            >
                {/* List components */}
                {(() => {
                    let a = [];
                    for (let i = 0; i < 5; i++) {
                        a.push((
                            <TouchableOpacity onPress={navigateToOffer}>
                                <TravelListItem
                                    {...props}
                                    key={i}
                                    userInfo={data.userInfo}
                                    travelPoints={data.travelPoints}
                                    departure={data.departure}
                                    luggage={data.bags}
                                    price={data.price}
                                    people={data.people}
                                    description={data.description}
                                />
                            </TouchableOpacity>
                        ));
                    }
                    return a;
                })()}
                {/*  */}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    listContainer: {
        marginVertical: 12,
    },

});

export default TravelList;