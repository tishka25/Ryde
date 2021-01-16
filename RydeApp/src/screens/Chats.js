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



const Chats = (props) => {
    return (
        <SafeAreaView style={{}}>
            <StatusBar barStyle="dark-content" />
            <View style={{ width: "100%", height: "100%" }}>
                {/* <Text>ZDR KO PR</Text> */}
                <ChatList {...props}/>
            </View>

        </SafeAreaView>
    );
}


export default Chats;