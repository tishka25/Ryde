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
import { goBack, navigate } from "../utils/rootNavigation";
import userHandler from "../utils/userHandler";



const Login = (props) => {


    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");

    async function handleLogin(){
        await userHandler.setCredentials({ email, password });
        const user = userHandler.getCredentials();
        console.log("KUREC", user, email, password);
        const data = await requestHandler("user", "get");
        console.log("User is:", data);
        await userHandler.setUser(data);
        navigate("Home");
    }


    return (
        <SafeAreaView style={{}}>
            <StatusBar barStyle="dark-content" />
            <View style={styles.rootView}>
                <View style={styles.logoContainer}>
                    <Icon name="road" size={100} />
                    <Icon name="chevron-right" size={32} />
                    <Icon name="chevron-right" size={32} />
                </View>

                <View style={styles.inputsContainer}>
                    <View style={styles.inputContainer}>
                        <TextInput placeholder="E-Mail" placeholderTextColor="#666" style={styles.inputBox} value={email} onChangeText={(t) => setEmail(t)}/>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput placeholder="Password" secureTextEntry placeholderTextColor="#666" style={styles.inputBox} value={password} onChangeText={(t) => setPassword(t)}/>
                    </View>

                    <View style={{ width: "95%" , marginTop: 32}}>
                        <Button title="Login" onPress={handleLogin}/>
                    </View>

                    <View style={{ width: "95%", marginTop: 16}}>
                        <Button title="Register" onPress={()=> navigate("Register")}/>
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
        top: "40%"
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

export default Login;