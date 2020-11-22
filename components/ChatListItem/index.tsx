import React from 'react';
import { Text, View, Image } from 'react-native';
import { formatDistanceToNow, format } from 'date-fns';
import { ChatRoom } from '../../types';
import styles from './style';

export type ChatListItemProps =
    {
        chatRoom: ChatRoom;
    };

const ChatListItem = (props: ChatListItemProps) => 
{
    const { chatRoom } = props;

    const user = chatRoom.users[1];
    const userAvatar = "https://avatars2.githubusercontent.com/u/33727291?s=460&u=4afe260b1d38daf898273cba9535455c34f2d07d&v=4";

    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Image source={{ uri: userAvatar }} style={styles.avatar} />
                <View style={styles.midContainer}>
                    <Text style={styles.username}>{user.name}</Text>
                    <Text style={styles.lastMessage}>{chatRoom.lastMessage.content}</Text>
                </View>
            </View>
            <Text style={styles.time}>{format(new Date(Date.parse(chatRoom.lastMessage.createdAt)), "dd/MM/yyyy")}</Text>
        </View>
    );
};

export default ChatListItem;