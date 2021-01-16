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
} from 'react-native';
import ChatView from "../components/ChatView"
import requestHandler from "../utils/requestHandler";

// const messages = [{ "id": 1, "content": "Hello!", "timeSent": "2020-01-13T12:55:23.000+00:00", "senderId": 5, "requestId": 1 }, { "id": 2, "content": "Hi mate!", "timeSent": "2020-01-13T12:56:47.000+00:00", "senderId": 1, "requestId": 1 }, { "id": 3, "content": "You have a question about the offer?", "timeSent": "2020-01-13T12:57:00.000+00:00", "senderId": 1, "requestId": 1 }, { "id": 4, "content": "Yes", "timeSent": "2020-01-13T12:58:10.000+00:00", "senderId": 5, "requestId": 1 }, { "id": 5, "content": "I was wondering which route you were planning on taking?", "timeSent": "2020-01-13T12:58:25.000+00:00", "senderId": 5, "requestId": 1 }, { "id": 6, "content": "Ah well, the shortest one ofcourse :D", "timeSent": "2020-01-13T12:58:50.000+00:00", "senderId": 1, "requestId": 1 }, { "id": 7, "content": "Hahaha, so you a comediant? :D", "timeSent": "2020-01-13T12:59:12.000+00:00", "senderId": 5, "requestId": 1 }]



const Chat = ({ navigation, receipientName }) => {
    navigation.setOptions({ title: receipientName ? receipientName : "Viktor Naychev" })

    const [messages, setMessages] = React.useState([]);

    const getMessages = async () =>{
        const m = await requestHandler("message", "getAllByRequestId", ["2"]);
        setMessages(m);
    }

    React.useEffect(()=>{
        if(!messages.length){
            getMessages();
        }
    }, []);

    const [message, setMessage] = React.useState("");


    return (
        <SafeAreaView style={{}}>
            <StatusBar barStyle="dark-content" backgroundColor="white" />
            <View style={styles.rootView}>
                <View style={styles.chatView}>
                    <ChatView messages={messages} />
                </View>
                <View style={styles.textInput}>
                    <TextInput value={message} onChange={setMessage}></TextInput>
                </View>
            </View>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    rootView: { width: "100%", height: "100%", flexDirection: "column", justifyContent: "space-between" },
    chatView: {
        // height: Dimensions.get("screen").height - 200,
        height: "92%",
    },
    textInput: {
        position: "absolute",
        bottom: 0,
        height: 48,
        borderColor: "black",
        borderStyle: "solid",
        borderWidth: 2,
        borderRadius: 10,
        width: "100%"
    },
});


export default Chat;