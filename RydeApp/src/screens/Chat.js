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
} from 'react-native';
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from 'react-native-vector-icons/FontAwesome';

import ChatView from "../components/ChatView"
import requestHandler from "../utils/requestHandler";

// const messages = [{ "id": 1, "content": "Hello!", "timeSent": "2020-01-13T12:55:23.000+00:00", "senderId": 5, "requestId": 1 }, { "id": 2, "content": "Hi mate!", "timeSent": "2020-01-13T12:56:47.000+00:00", "senderId": 1, "requestId": 1 }, { "id": 3, "content": "You have a question about the offer?", "timeSent": "2020-01-13T12:57:00.000+00:00", "senderId": 1, "requestId": 1 }, { "id": 4, "content": "Yes", "timeSent": "2020-01-13T12:58:10.000+00:00", "senderId": 5, "requestId": 1 }, { "id": 5, "content": "I was wondering which route you were planning on taking?", "timeSent": "2020-01-13T12:58:25.000+00:00", "senderId": 5, "requestId": 1 }, { "id": 6, "content": "Ah well, the shortest one ofcourse :D", "timeSent": "2020-01-13T12:58:50.000+00:00", "senderId": 1, "requestId": 1 }, { "id": 7, "content": "Hahaha, so you a comediant? :D", "timeSent": "2020-01-13T12:59:12.000+00:00", "senderId": 5, "requestId": 1 }]



const Chat = ({ navigation, receipientName }) => {
    navigation.setOptions({ title: receipientName ? receipientName : "Viktor Naychev" })

    const [messages, setMessages] = React.useState([]);
    const [currentMessage, onChnageText] = React.useState("");


    const getMessages = async () => {
        const m = await requestHandler("message", "getAllByRequestId", ["2"]);
        setMessages(m);
    }

    const sendMessage = () => {
        console.log("Sending message:", currentMessage);
        //Message is send. Delete current input
        onChnageText("");
    }

    React.useEffect(() => {
        if (!messages.length) {
            // getMessages();
        }
    }, []);



    return (
        <SafeAreaView style={{}}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={styles.rootView}>
                <View style={styles.chatView}>
                    <ChatView messages={messages} userId={1} />
                </View>
                <View style={styles.textInputContainer}>
                    <TextInput value={currentMessage} onChangeText={(text) => onChnageText(text)}  onSubmitEditing={sendMessage} style={styles.textInput} />
                    {/* <Button title={"Send"}/> */}
                    <TouchableOpacity onPress={sendMessage}>
                        {/* <Text>SEND</Text> */}
                        <Icon name={"chevron-circle-up"} size={38} color={"#987bf3"}/>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    rootView: { width: "100%", height: "100%", flexDirection: "column", justifyContent: "space-between" },
    chatView: {
        // height: Dimensions.get("screen").height - 200,
        // height: "92%",
        height: "50%"
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