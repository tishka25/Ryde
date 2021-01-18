import { Block } from 'galio-framework';
import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import PropTypes from "prop-types";
import ChatListItem from './ChatListItem';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { navigate } from '../utils/rootNavigation';

const ChatList = (props) => {
    const { requests } = props;

    function navigateToChat(params){
        try{
            navigate("ChatsRoot", { screen: "Chat" , params})
        }catch(e){
            console.error(e);
        }
    }

    function renderList(){
        if(!requests){
            return;
        }
        return requests.map(r=>{
            return (
                <TouchableOpacity onPress={()=> navigateToChat(r)}>
                    <ChatListItem {...props} request={r}/> 
                </TouchableOpacity>
            )
        });
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.listContainer}
            >
                {renderList()}

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default ChatList;