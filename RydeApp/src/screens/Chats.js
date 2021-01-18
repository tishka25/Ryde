import { useFocusEffect } from "@react-navigation/native";
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
import requestHandler from "../utils/requestHandler";



const Chats = (props) => {

    const [requests, setRequests] = React.useState([]);
    
    async function loadRequest(){
        const responseOffer = await requestHandler("request", "getByOffer");
        const responseUser = await requestHandler("request", "getByUser");

        // responseOffer.push(responseUser);
        let response = responseOffer.concat(responseUser);

        console.log(responseUser, responseOffer, response);

        if(JSON.stringify(response) !== JSON.stringify(requests))
            setRequests(response);
    }

    useFocusEffect(
        React.useCallback(() => {
            loadRequest();

            return () => console.log("UNFOCUS")
        }, [requests])
    );
    return (
        <SafeAreaView style={{}}>
            <StatusBar barStyle="dark-content" />
            <View style={{ width: "100%", height: "100%" }}>
                {/* <Text>ZDR KO PR</Text> */}
                <ChatList {...props} requests={requests}/>
            </View>

        </SafeAreaView>
    );
}


export default Chats;