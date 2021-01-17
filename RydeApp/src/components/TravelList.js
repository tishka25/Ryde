import { Block } from 'galio-framework';
import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import PropTypes from "prop-types";
import TravelListItem from './TravelListItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { map_values } from '../utils/utils';


const propTypes = {
    navigation: PropTypes.object,
    offers: PropTypes.array,
}


const TravelList = (props) => {
    const { navigation, offers } = props;



    function navigateToOffer(params) {
        try {
            console.log("Params before:", params)
            navigation.navigate("OffersRoot", { screen: "Offer", params })
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
                    if (offers) {
                        console.log(offers);
                        a = offers;
                    } else {
                        for (let i = 0; i < 5; i++) {
                            a.push(data);
                        }
                    }
                    return a.map(el => {
                        return (<TouchableOpacity onPress={() => navigateToOffer(el)}>
                            <TravelListItem
                                key={new Date().now}
                                {...el}
                                price={map_values(el.price, 0, 100, 0, 3)}
                                cardView
                                panningEnabled={false}
                            />
                        </TouchableOpacity>
                        );
                    })
                })()}
                {/*  */}

            </ScrollView>
        </View>
    );
}

TravelList.propTypes = propTypes;

const styles = StyleSheet.create({
    listContainer: {
        // marginVertical: 12,
        // flex:1,
        // justifyContent: "center"
    },

});

export default TravelList;