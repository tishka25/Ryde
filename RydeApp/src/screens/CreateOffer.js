
import * as React from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Button,
    Text,
    StatusBar,
    Image,
} from 'react-native';
import { navigate } from "../utils/rootNavigation";
import Icon from "react-native-vector-icons/FontAwesome";
import { TextInput } from "react-native-gesture-handler";
import DatePicker from 'react-native-datepicker';
import requestHandler from "../utils/requestHandler";
import userHandler from "../utils/userHandler";



const CreateOffer = (props) => {

    const [startCity, setStartCity] = React.useState({});
    const [destinationCity, setDestinationCity] = React.useState({});


    const [startCityMsg, setStartCityMsg] = React.useState("");
    const [destinationCityMsg, setDestinationCityMsg] = React.useState("");


    const [startCityName, setStartCityName] = React.useState("");
    const [destinationCityName, setDestinationCityName] = React.useState("");

    const [date, setDate] = React.useState(new Date());

    const [price, setPrice] = React.useState(0);

    const [luggage, setLuggage] = React.useState(0);

    const [capacity, setCapacity] = React.useState(0);

    let cityCheckerTimeout = null;

    function handleStartCity(text) {
        setStartCityName(text);
        clearTimeout(cityCheckerTimeout);
        cityCheckerTimeout = setTimeout(async () => {
            const status = await handleCityName(text);
            if (!status) {
                setStartCityMsg("Invalid City name")
            } else {
                setStartCityMsg("");
                setStartCity(status)
            }
        }, 500);
    }

    function handleDestinationCity(text) {
        setDestinationCityName(text);
        clearTimeout(cityCheckerTimeout);
        cityCheckerTimeout = setTimeout(async () => {
            const status = await handleCityName(text);
            if (!status) {
                setDestinationCityMsg("Invalid City name")
            } else {
                setDestinationCityMsg("");
                setDestinationCity(status);
            }
        }, 500);
    }

    async function handleCityName(text) {
        const city = await requestHandler("city", "getByName", [text]);
        if (city.error)
            return false;
        return city;
    }

    async function addOfferHandler() {
        if (destinationCityMsg != "" || startCityMsg != "") {
            return;
        }
        const data = {
            startCity, destinationCity, luggage, price, capacity,
            user: {
                id: userHandler.getUser().id
            },
            date: (() => {
                let hours = date.getHours();
                let minutes = date.getMinutes();
                let months = date.getMonth() + 1;
                let day = date.getDate();
                if (hours < 10)
                    hours = "0" + hours;

                if (minutes < 10)
                    minutes = "0" + minutes;

                if(months < 10)
                    months = "0" + months;

                if(day < 10)
                    day = "0" + day;

                return `${date.getFullYear().toString()}-${months}-${day}T${hours}:${minutes}`;
            })()
        }
        console.log("Data to send:", data);
        await requestHandler("offer", "create", data);
        navigate("Home");
    }

    return (
        <SafeAreaView style={{}}>
            <StatusBar barStyle="dark-content" />
            <View style={{ width: "100%", height: "100%" }}>

                <ScrollView>

                    <View style={[styles.rowContainer]}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}>Start city</Text>
                            <Text style={{ color: "red" }}>{startCityMsg}</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="City name"
                                    placeholderTextColor="#666"
                                    style={styles.inputBox}
                                    value={startCityName}
                                    onChangeText={handleStartCity}
                                />
                            </View>
                        </View>
                    </View>


                    <View style={[styles.rowContainer]}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}>Destination city</Text>
                            <Text style={{ color: "red" }}>{destinationCityMsg}</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="City name"
                                    placeholderTextColor="#666" style={styles.inputBox}
                                    value={destinationCityName}
                                    onChangeText={handleDestinationCity}
                                />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.rowContainer]}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}>Date of departure</Text>
                            <View style={styles.inputContainer}>
                                <DatePicker
                                    style={styles.inputBox}
                                    date={date} // Initial date from state
                                    mode="datetime" // The enum of date, datetime and time
                                    placeholder="Select date"
                                    format="DD-MM-YYYY HH:MM"
                                    minDate="01-01-2016"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            display: 'none',
                                        },
                                        dateInput: {
                                            borderWidth: 0,
                                        },
                                    }}
                                    onDateChange={(date) => {
                                        setDate(date);
                                    }}
                                />
                            </View>
                        </View>
                    </View>




                    <View style={[styles.rowContainer]}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}>Price</Text>
                            <View style={styles.inputContainer}>
                                <TextInput placeholder="Leva" keyboardType='numeric' placeholderTextColor="#666" style={styles.inputBox} value={price} onChangeText={(t) => setPrice(parseInt(t))} />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.rowContainer]}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}>Luggage</Text>
                            <View style={styles.inputContainer}>
                                <TextInput placeholder="Bags" keyboardType='numeric' placeholderTextColor="#666" style={styles.inputBox} value={luggage} onChangeText={(t) => setLuggage(parseInt(t))} />
                            </View>
                        </View>
                    </View>




                    <View style={[styles.rowContainer]}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}>Capacity</Text>
                            <View style={styles.inputContainer}>
                                <TextInput placeholder="People" keyboardType='numeric' placeholderTextColor="#666" style={styles.inputBox} value={capacity} onChangeText={(t) => setCapacity(parseInt(t))} />
                            </View>
                        </View>
                    </View>


                    <View style={{ width: "95%", marginVertical: 32, alignSelf: "center" }}>
                        <Button title="Create" color={"#987bf3"} onPress={addOfferHandler} />
                    </View>

                </ScrollView>
            </View>

        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    rowContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
        // marginHorizontal: 18
    },
    infoContainer: {
        flexDirection: "column",
        marginLeft: 32
    },
    infoTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    infoContent: {
        fontSize: 18,
    },
    tinyIcon: {
        width: 18,
        height: 18,
        marginHorizontal: 2,
    },
    inputContainer: {
        backgroundColor: "white",
        elevation: 5,
        borderRadius: 30,
        marginVertical: 14,
        // marginTop: 14,
        width: "95%",
        flexDirection: "row",
        alignSelf: "center",
    },
    inputBox: {
        width: "100%",
        padding: 12,
        paddingLeft: 20,
        paddingTop: 14,
    },

});

export default CreateOffer;