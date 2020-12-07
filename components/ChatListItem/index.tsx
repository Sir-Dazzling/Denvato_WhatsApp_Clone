import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { ChatRoom } from '../../types';
import { useNavigation } from '@react-navigation/native';
import styles from './style';
import { Auth } from 'aws-amplify';

export type ChatListItemProps =
    {
        chatRoom: ChatRoom;
    };

const ChatListItem = (props: ChatListItemProps) => 
{
    const { chatRoom } = props;
    const [otherUser, setOtherUser] = useState(null);

    // const userAvatar = "https://avatars2.githubusercontent.com/u/33727291?s=460&u=4afe260b1d38daf898273cba9535455c34f2d07d&v=4";

    const navigation = useNavigation();

    useEffect(() =>
    {
        const getOtherUser = async () => 
        {
            const userInfo = await Auth.currentAuthenticatedUser();

            if (chatRoom.chatRoomUsers.items[0].user.id === userInfo.attributes.sub)
            {
                setOtherUser(chatRoom.chatRoomUsers.items[1].user);
            } else
            {
                setOtherUser(chatRoom.chatRoomUsers.items[0].user)
            }
        }
        getOtherUser();
        console.log("refreshed");

    }, []);

    const onClick = () => 
    {
        navigation.navigate("ChatRoom", {
            id: chatRoom.id,
            name: otherUser.name,
            uri: otherUser.imageUri
        });
    };

    if (!otherUser)
    {
        return null;
    }

    return (
        <TouchableOpacity onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{ uri: otherUser.imageUri }} style={styles.avatar} />
                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{otherUser.name}</Text>
                        <Text style={styles.lastMessage}>{chatRoom.lastMessage ? chatRoom.lastMessage.content : null}</Text>
                    </View>
                </View>
                <Text
                    style={styles.time}>
                    {chatRoom.lastMessage && format(
                        new Date(
                            Date.parse(chatRoom.lastMessage.createdAt)
                        ),
                        "dd/MM/yyyy"
                    )
                    }
                </Text>
            </View>
        </TouchableOpacity>
    );
};

export default ChatListItem;