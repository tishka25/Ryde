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
import { TextInput } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';
import requestHandler from "../utils/requestHandler";
import { navigate } from "../utils/rootNavigation";



const Register = (props) => {

    const [firstName, setFirstName] = React.useState("");

    const [lastName, setLastName] = React.useState("");

    const [password, setPassword] = React.useState("");

    const [email, setEmail] = React.useState("");

    const [phoneNumber, setPhoneNumber] = React.useState("");


    async function handleRegister(){
        const data = {
            firstName, lastName, password, email, phoneNumber
        };
        console.log("Registering:", JSON.stringify(data));
        await requestHandler("user", "register", JSON.stringify(data));
    }


    return (
        <SafeAreaView style={{}}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.rootView}>
                {/* <View style={styles.logoContainer}>
                    <Icon name="road" size={100} />
                    <Icon name="chevron-right" size={32} />
                    <Icon name="chevron-right" size={32} />
                </View> */}

                <View style={styles.inputsContainer}>

                    <View style={styles.inputContainer}>
                        <TextInput placeholder="First Name" placeholderTextColor="#666" style={styles.inputBox} value={firstName} onChangeText={(t) => setFirstName(t)} />
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Last Name" placeholderTextColor="#666" style={styles.inputBox} value={lastName} onChangeText={(t) => setLastName(t)}/>
                    </View>
                    
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Phone Number" keyboardType='numeric' placeholderTextColor="#666" style={styles.inputBox} value={phoneNumber} onChangeText={(t) => setPhoneNumber(t)}/>
                    </View>


                    <View style={styles.inputContainer}>
                        <TextInput placeholder="E-Mail" placeholderTextColor="#666" style={styles.inputBox} value={email} onChangeText={(t) => setEmail(t)}/>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Password" secureTextEntry placeholderTextColor="#666" style={styles.inputBox} value={password} onChangeText={(t) => setPassword(t)} />
                    </View>

                    <View style={{ width: "95%" , marginTop: 32}}>
                        <Button title="Register" onPress={handleRegister}/>
                    </View>


                </View>


            </View>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    rootView: {
        justifyContent: "flex-start",
        alignItems: "center",
        flexDirection: "column",
        width: "100%",
        height: "100%",
        backgroundColor: "#987bf3",
    },
    inputsContainer: {
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        position: "absolute",
        top: "10%"
    },
    logoContainer: {
        justifyContent: "space-evenly",
        alignItems: "center",
        marginVertical: 32,
        flexDirection: "row",
        // padding: 32,
        width: "80%",
        height: "30%",
        borderRadius: 50,
        borderColor: "white",
        borderWidth: 1,
    },
    inputContainer: {
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 4,
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

export default Register;