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
    header: PropTypes.any,
}


const TravelList = (props) => {
    const { navigation, offers, header } = props;



    function navigateToOffer(params) {
        try {
            navigation.navigate("OffersRoot", { screen: "Offer", params })
        } catch (e) {
            console.error(e);
        }
    }


    return (
        <View style={{ flex: 1 }}>

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                stickyHeaderIndices={(header) ? [0]: null}
                style={styles.listContainer}
            >
                {header}
                {/* List components */}
                {(() => {
                    let a = [];
                    if (offers) {
                        console.log(offers);
                        a = offers;
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