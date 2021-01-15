import { Block } from 'galio-framework';
import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import PropTypes from "prop-types";
import ChatListItem from './ChatListItem';

const ChatList = (props) => {
    const { } = props;

    return (
        <View style={{ flex: 1 }}>
            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={styles.listContainer}
            >
                {/* List components */}
                <ChatListItem {...props}/>
                {/*  */}
                <ChatListItem />
                <ChatListItem />


            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({

});

export default ChatList;