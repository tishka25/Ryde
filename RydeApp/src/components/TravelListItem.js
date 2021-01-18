import { Block } from 'galio-framework';
import React, { useEffect } from 'react';
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView from './MapView';
import PropTypes from "prop-types";


const bagIcon = require("../assets/portfolio.png");
const starIcon = require("../assets/star.png");
const personIcon = require("../assets/user.png");
const dollarIcon = require("../assets/dollar.png");


function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

const propTypes = {
    user: PropTypes.shape({
        picture: PropTypes.string.isRequired,
        firstName: PropTypes.string.isRequired,
        lastName: PropTypes.string.isRequired,
        rating: PropTypes.oneOf([0, 1, 2, 3, 4, 5]).isRequired,
    }).isRequired,
    startCity: PropTypes.shape({
        name: PropTypes.string,
        latitude: PropTypes.number,
        longitude: PropTypes.number
    }),
    destinationCity: PropTypes.shape({
        name: PropTypes.string,
        latitude: PropTypes.number,
        longitude: PropTypes.number
    }),
    date: PropTypes.oneOfType([PropTypes.number, PropTypes.object, PropTypes.string]).isRequired,
    luggage: PropTypes.oneOf([0, 1, 2, 3]).isRequired,
    price: PropTypes.number.isRequired,
    capacity: PropTypes.oneOf([0, 1, 2, 3, 4, 5, 6, 7]).isRequired,
    description: PropTypes.string,
    height: PropTypes.number,
    cardView: PropTypes.bool,
    panningEnabled: PropTypes.bool
};

const defaultProps = {
    user: {
        picture: "https://reactnative.dev/img/tiny_logo.png",
        firstName: "Teodor",
        lastName: "Stanishev",
        rating: 4
    }
}

const TravelListItem = ({
    user,
    startCity,
    destinationCity,
    date,
    luggage,
    price,
    capacity,
    description,
    cardView,
    height,
    panningEnabled
}) => {


    const dimensions = Dimensions.get("window");

    let departureDate = "";
    let departureTime = "";
    if (isValidDate(new Date(date))) {
        const d = new Date(date);
        let hours = d.getHours();
        let minutes = d.getMinutes();
        if(hours < 10)
            hours = "0" + hours;

        if(minutes < 10)
            minutes = "0" + minutes;
        // departureDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear().toString().slice(2, 4)} `;
        departureDate = `${d.getDate()}.${d.getMonth() + 1}.${d.getFullYear().toString()} `;
        departureTime = `${hours}:${minutes}`;
    }


    return (
            <View style={styles.listItem}>
                <Block
                    flex
                    card={cardView}
                    top
                    height={(height) ? height: 200}
                    width={"100%"}
                >
                    {/* Map */}
                    <View style={styles.mapContainer}>
                        <MapView
                            startPoint={[startCity.longitude, startCity.latitude]}
                            finishPoint={[destinationCity.longitude, destinationCity.latitude]} 
                            panningEnabled={panningEnabled}
                            />
                    </View>
                    {/* Info */}
                    <View style={styles.listInfoContainer}>
                        <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
                            <View style={[styles.rowContainer, styles.userInfoContainer]}>
                                <Image
                                    style={styles.profileImage}
                                    source={(()=> {
                                        if(user.picture){
                                            return { uri: user.picture };
                                        }else{
                                            return require("../assets/defaultPicture.jpg")
                                        }
                                    })()}
                                />
                                <Text>{user.firstName} {user.lastName}</Text>
                            </View>
                            <View style={[styles.rowContainer, styles.ratingContainer]}>
                                {(() => {
                                    let a = [];
                                    for (let i = 0; i < user.rating; i++) {
                                        a = [...a, (
                                            <Image
                                                key={i}
                                                style={styles.tinyIcon}
                                                source={starIcon}
                                            />
                                        )];
                                    }
                                    return a;
                                })()}
                            </View>
                        </View>
                        <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
                            <View style={[styles.rowContainer, styles.departureInfoContainer]}>
                                <Text style={styles.normalText}>
                                    From
                            <Text style={styles.boldText}> {startCity.name}</Text>
                                    <Text style={styles.normalText}> to </Text>
                                    <Text style={styles.boldText}>{destinationCity.name}</Text>
                                </Text>
                            </View>
                            <View style={[styles.rowContainer, styles.departureInfoContainer]}>
                                <Text style={styles.normalText}>
                                    {departureDate}
                                    <Text style={styles.boldText}> {departureTime}</Text>
                                </Text>
                            </View>
                        </View>

                        <View style={[styles.rowContainer, { justifyContent: "space-between" }]}>
                            {/* luggage container */}
                            <View style={[styles.rowContainer, styles.sharedDriveInfoContainer]}>
                                {(() => {
                                    let a = [];
                                    for (let i = 0; i < luggage; i++) {
                                        a = [...a, (
                                            <Image
                                                key={i}
                                                style={styles.tinyIcon}
                                                source={bagIcon}
                                            />
                                        )];
                                    }
                                    return a;
                                })()}
                            </View>
                            {/*  */}
                            {/* Price container */}
                            <View style={[styles.rowContainer, styles.sharedDriveInfoContainer]}>
                                {(() => {
                                    let a = [];
                                    for (let i = 0; i < price; i++) {
                                        a = [...a, (
                                            <Image
                                                key={i}
                                                style={styles.tinyIcon}
                                                source={dollarIcon}
                                            />
                                        )];
                                    }
                                    return a;
                                })()}
                            </View>
                            {/*  */}
                            {/* People container */}
                            <View style={[styles.rowContainer, styles.sharedDriveInfoContainer, { width: 180, justifyContent: "flex-end" }]}>
                                {(() => {
                                    let a = [];
                                    for (let i = 0; i < capacity; i++) {
                                        a = [...a, (
                                            <Image
                                                key={i}
                                                style={styles.tinyIcon}
                                                source={personIcon}
                                            />
                                        )]
                                    }
                                    return a;
                                })()}

                            </View>
                            {/*  */}

                        </View>

                        <View style={styles.rowContainer}>
                            {/* TODO:
                        Limit text to some characters 
                         */}
                            <Text>
                                {description}
                            </Text>
                        </View>
                    </View>
                </Block>

            </View>
    )
}

const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        width: "98%",
        alignContent: "center",
        justifyContent: "center",
        alignSelf: "center",
        marginVertical: 2
    },
    mapContainer: { height: "40%", width: "100%" },
    userInfoContainer: {
        width: "auto"
    },
    profileImage: {
        width: 32,
        height: 32,
        borderRadius: 50,
        marginRight: 8,
    },
    listInfoContainer: { flex: 1, flexDirection: "column", justifyContent: "flex-start", marginHorizontal: 8 },
    rowContainer: { width: "100%", display: "flex", flexDirection: "row", alignItems: "center", marginVertical: 2 },
    boldText: {
        fontWeight: "bold",
    },
    normalText: {
        fontWeight: "normal",
    },
    tinyIcon: {
        width: 18,
        height: 18,
        marginHorizontal: 2
    },
    ratingContainer: {
        width: "auto"
    },
    departureInfoContainer: {
        width: 100
    },
    sharedDriveInfoContainer: {
        width: 20,
    }
});


TravelListItem.propTypes = propTypes;

TravelListItem.defaultProps = defaultProps;

export default TravelListItem;