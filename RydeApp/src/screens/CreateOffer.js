
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



const CreateOffer = (props) => {

    const [startCity, setStartCity] = React.useState("");
    const [destinationCity, setDestinationCity] = React.useState("");

    const [date, setDate] = React.useState(new Date());

    const [price, setPrice] = React.useState(0);

    const [luggage, setLuggage] = React.useState(0);

    const [capacity, setCapacity] = React.useState(0);


    async function handleCityName(text) {

    }

    return (
        <SafeAreaView style={{}}>
            <StatusBar barStyle="dark-content" />
            <View style={{ width: "100%", height: "100%" }}>

                <ScrollView>

                    <View style={[styles.rowContainer]}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}>Start city</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="City name"
                                    placeholderTextColor="#666" style={styles.inputBox}
                                    value={startCity}
                                    onChangeText={handleCityName}
                                />
                            </View>
                        </View>
                    </View>


                    <View style={[styles.rowContainer]}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}>Destination city</Text>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    placeholder="City name"
                                    placeholderTextColor="#666" style={styles.inputBox}
                                    value={startCity}
                                    onChangeText={handleCityName}
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
                                    mode="date" // The enum of date, datetime and time
                                    placeholder="select date"
                                    format="DD-MM-YYYY"
                                    minDate="01-01-2016"
                                    confirmBtnText="Confirm"
                                    cancelBtnText="Cancel"
                                    customStyles={{
                                        dateIcon: {
                                            display: 'none',
                                            // position: 'absolute',
                                            // left: 0,
                                            // top: 4,
                                            // marginLeft: 0,
                                        },
                                        dateInput: {
                                            borderWidth: 0,

                                            // marginLeft: 36,
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
                                <TextInput placeholder="Leva" keyboardType='numeric' placeholderTextColor="#666" style={styles.inputBox} value={price} onChangeText={(t) => setPrice(T)} />
                            </View>
                        </View>
                    </View>

                    <View style={[styles.rowContainer]}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}>Luggage</Text>
                            <View style={styles.inputContainer}>
                                <TextInput placeholder="Bags" keyboardType='numeric' placeholderTextColor="#666" style={styles.inputBox} value={luggage} onChangeText={(t) => setLuggage(T)} />
                            </View>
                        </View>
                    </View>




                    <View style={[styles.rowContainer]}>
                        <View style={styles.infoContainer}>
                            <Text style={styles.infoTitle}>Capacity</Text>
                            <View style={styles.inputContainer}>
                                <TextInput placeholder="People" keyboardType='numeric' placeholderTextColor="#666" style={styles.inputBox} value={capacity} onChangeText={(t) => setCapacity(T)} />
                            </View>
                        </View>
                    </View>


                    <View style={{ width: "95%", marginVertical: 32, alignSelf: "center" }}>
                        <Button title="Create" color={"#987bf3"} />
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