import { useFocusEffect } from "@react-navigation/native";
import * as React from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    TextInput,
    Dimensions,
    Button,
    Image,
} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';

import ChatView from "../components/ChatView"
import requestHandler from "../utils/requestHandler";
import { navigate } from "../utils/rootNavigation";
import userHandler from "../utils/userHandler";

// const messages = [{ "id": 1, "content": "Hello!", "timeSent": "2020-01-13T12:55:23.000+00:00", "senderId": 5, "requestId": 1 }, { "id": 2, "content": "Hi mate!", "timeSent": "2020-01-13T12:56:47.000+00:00", "senderId": 1, "requestId": 1 }, { "id": 3, "content": "You have a question about the offer?", "timeSent": "2020-01-13T12:57:00.000+00:00", "senderId": 1, "requestId": 1 }, { "id": 4, "content": "Yes", "timeSent": "2020-01-13T12:58:10.000+00:00", "senderId": 5, "requestId": 1 }, { "id": 5, "content": "I was wondering which route you were planning on taking?", "timeSent": "2020-01-13T12:58:25.000+00:00", "senderId": 5, "requestId": 1 }, { "id": 6, "content": "Ah well, the shortest one ofcourse :D", "timeSent": "2020-01-13T12:58:50.000+00:00", "senderId": 1, "requestId": 1 }, { "id": 7, "content": "Hahaha, so you a comediant? :D", "timeSent": "2020-01-13T12:59:12.000+00:00", "senderId": 5, "requestId": 1 }]



const Chat = ({ navigation, route }) => {

    const [messages, setMessages] = React.useState([]);
    const [currentMessage, onChnageText] = React.useState("");

    const params = route.params;
    console.log("Chat param:", params);

    navigation.setOptions({ title: params.user.firstName ? `${params.user.firstName} ${params.user.lastName}` : "Viktor Naychev" });
    navigation.setOptions({
        headerStyle: {
            elevation: 50,
        }
    })


    const getMessages = async () => {
        const m = await requestHandler("message", "getByRequestId", [params.id]);
        if (JSON.stringify(m) !== JSON.stringify(messages))
            setMessages(m);
    }

    const sendMessage = async () => {
        console.log("Sending message:", currentMessage);

        const data = { content: currentMessage, senderId: userHandler.getUser().id, requestId: params.id };
        await requestHandler("message", "create", data);

        //Updates messages
        await getMessages();
        //

        //Message is send. Delete current input
        onChnageText("");
    }

    let getMessagesTimeout = null;

    useFocusEffect(
        React.useCallback(() => {
            clearTimeout(getMessagesTimeout);
            getMessagesTimeout = setTimeout(async () => {
                await getMessages();
            }, 1000);

            return () => console.log("UNFOCUS")
        }, [messages])
    );



    return (
        <SafeAreaView style={{}}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={styles.rootView}>
                <View style={[styles.rowContainer, { justifyContent: "space-evenly", alignSelf: "center" }, styles.offerInfoContainer]}>
                    {/* luggage container */}
                    <View style={[styles.rowContainer, styles.sharedDriveInfoContainer]}>
                        {(() => {
                            let a = [];
                            for (let i = 0; i < params.luggage; i++) {
                                a = [...a, (
                                    <Image
                                        key={i}
                                        style={styles.tinyIcon}
                                        source={require("../assets/portfolio.png")}
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
                            for (let i = 0; i < params.capacity; i++) {
                                a = [...a, (
                                    <Image
                                        key={i}
                                        style={styles.tinyIcon}
                                        source={require("../assets/user.png")}
                                    />
                                )];
                            }
                            return a;
                        })()}
                    </View>
                </View>
                <View style={styles.chatView}>
                    <ChatView messages={messages} userId={userHandler.getUser().id} />
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput value={currentMessage} onChangeText={(text) => onChnageText(text)} onSubmitEditing={sendMessage} style={styles.textInput} />
                    {/* <Button title={"Send"}/> */}
                    <TouchableOpacity onPress={sendMessage}>
                        {/* <Text>SEND</Text> */}
                        <Icon name={"chevron-circle-up"} size={38} color={"#987bf3"} />
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    rootView: { width: "100%", height: "100%", flexDirection: "column", justifyContent: "space-between" },
    offerInfoContainer: {
        position: "absolute",
        marginTop: 0,
        top: 0,
        width: "100%",
        height: 64,
        zIndex: 80,
        backgroundColor: "white",
        elevation: 2,
    },
    rowContainer: { width: "100%", display: "flex", flexDirection: "row", alignItems: "center", marginVertical: 2},
    sharedDriveInfoContainer: {
        width: 20,
    },
    tinyIcon: {
        width: 18,
        height: 18,
        marginHorizontal: 2
    },
    chatView: {
        // height: Dimensions.get("screen").height - 200,
        height: "92%",
        // height: "50%"
    },
    textInput: { flex: 1, width: "80%" },
    textInputContainer: {
        position: "absolute",
        flex: 1,
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: "center",
        bottom: 0,
        height: 40,
        borderColor: "#987bf3",
        borderStyle: "solid",
        borderWidth: 1,
        borderRadius: 100,
        width: "100%"
    },
});


export default Chat;