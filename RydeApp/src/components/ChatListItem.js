import * as React from "react";
import { Dimensions, StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Block } from "galio-framework";

const dimensions = Dimensions.get("window");

const ChatListItem = ({ navigation }) => {

    function navigatoToChat(){
        try{
            navigation.navigate("ChatsRoot", {screen: "Chat"})
        }catch(e){
            console.error(e);
        }
    }

    return (

        <TouchableOpacity onPress={navigatoToChat}>

            <View style={styles.listItem}>
                <Block
                    flex
                    // card
                    top
                    height={80}
                    width={dimensions.width}
                >
                    <View style={[styles.rowContainer, { height: "100%" }]}>
                        <Image
                            style={styles.profileImage}
                            source={{ uri: "https://reactnative.dev/img/tiny_logo.png" }}
                        />
                        <View style={styles.columnContainer}>
                            <Text style={styles.mainText}>Victor Naychev</Text>
                            <Text style={styles.subText}>Zdr ko pr</Text>
                        </View>
                        <View style={[styles.columnContainer, { flexDirection: "row", justifyContent: "flex-end", marginHorizontal: 8, alignItems: "center" }]}>
                            <Text style={styles.subText}>12:23</Text>
                        </View>
                    </View>
                </Block>
            </View>
        </TouchableOpacity>

    );
}


const styles = StyleSheet.create({
    listItem: {
        flex: 1,
        width: "100%",
        alignContent: "flex-start",
        justifyContent: "flex-start",
        alignSelf: "center",
        // borderTopColor: "black",
        // borderTopWidth: 1,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
    },
    rowContainer: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
        // marginVertical: 2
        marginHorizontal: 2
    },
    columnContainer: {
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        width: "80%",
        height: "100%"
    },
    profileImage: {
        width: 60,
        height: 60,
        borderRadius: 50,
        marginRight: 8,
    },
    mainText: {
        fontSize: 16,
        fontWeight: "bold"
    },
    subText: {
        fontSize: 14,
    }
});

export default ChatListItem;