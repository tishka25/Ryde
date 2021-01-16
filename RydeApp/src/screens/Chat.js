import * as React from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';
import ChatList from "../components/ChatList"



const Chat = () => {
    return (
        <SafeAreaView style={{}}>
            <StatusBar barStyle="dark-content" />
            <View style={{ width: "100%", height: "100%" }}>
                <Text>Char s edi koi</Text>
                {/* <ChatList /> */}

            </View>

        </SafeAreaView>
    );
}


export default Chat;