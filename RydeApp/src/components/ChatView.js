import * as React from "react";
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
} from 'react-native';

import PropTypes from "prop-types";


const propTypes = {
    messages: PropTypes.arrayOf(PropTypes.exact({
        "id": PropTypes.number,
        "content": PropTypes.string,
        "timeSent": PropTypes.any,
        "senderId": PropTypes.number,
        "requestId": PropTypes.number
    })).isRequired,
}

const userID = 1;

const ChatView = ({ messages }) => {

    function renderMessages() {
        try {
            return messages.map((message) => {
                return (
                    <View style={styles.messageContainer}>
                        <View style={(message.senderId == userID) ? styles.localMessage : styles.participantMessage}>
                            <Text style={styles.mainText}>{message.content}</Text>
                        </View>
                    </View>
                );
            })
        } catch (error) {
            console.error("ERROR", error);
        }
    }



    const scrollView = React.useRef(); 

    return (

        <View style={{ width: "100%", height: "100%" }}>
            <ScrollView 
            ref={scrollView}
            onLayout={() => scrollView.current.scrollToEnd({animated: true})}
            onContentSizeChange={() => scrollView.current.scrollToEnd({animated: true})}
            style={styles.rootScrollView}
            >
                <View style={styles.rootColumnView}>
                    {renderMessages()}


                </View>

            </ScrollView>
        </View>

    );
}

ChatView.propTypes = propTypes;

const styles = StyleSheet.create({
    rootScrollView: {
        flex: 1,
        width: "100%",
        height: "95%",
        marginVertical: 16
    },
    rootColumnView: {
        flex: 1,
        flexDirection: "column"
    },
    mainText: {
        fontSize: 14
    },
    messageContainer: {
        // maxWidth: "80%"
    },
    localMessage: {
        flex: 1,
        maxWidth: "80%",
        marginHorizontal: 8,
        marginVertical: 3,
        alignSelf: "flex-end",
        flexDirection: "row",
        backgroundColor: "#987bf3",
        borderRadius: 32,
        padding: 16
    },
    participantMessage: {
        flex: 1,
        marginHorizontal: 8,
        marginVertical: 3,
        maxWidth: "80%",
        alignSelf: "flex-start",
        flexDirection: "row-reverse",
        backgroundColor: "grey",
        borderRadius: 32,

        padding: 16
    }
});


export default ChatView;