import { Block } from 'galio-framework';
import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import PropTypes from "prop-types";
import TravelListItem from './TravelListItem';

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
    const { } = props;

    return (
        <View style={{ flex: 1 }}>

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.listContainer}
            >
                {/* List components */}
                {(()=>{
                    let a = [];
                    for(let i = 0; i< 2; i++){
                        a.push((
                            <TravelListItem 
                                key={i}
                                userInfo={data.userInfo}
                                travelPoints={data.travelPoints}
                                departure={data.departure}
                                luggage={data.bags}
                                price={data.price}
                                people={data.people}
                                description={data.description}
                            />
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