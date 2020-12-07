import { useNavigation } from '@react-navigation/native';
import { API, Auth, graphqlOperation } from 'aws-amplify';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { createChatRoom, createChatRoomUser } from '../../graphql/mutations';
import { User } from '../../types';
import styles from './style';

export type ContactListItemProps =
    {
        user: User;
    };

const ContactListItem = (props: ContactListItemProps) => 
{
    const { user } = props;

    // const userAvatar = "https://avatars2.githubusercontent.com/u/33727291?s=460&u=4afe260b1d38daf898273cba9535455c34f2d07d&v=4";

    const navigation = useNavigation();

    const onClick = async () => 
    {
        try
        {
            // create a new chat room
            const newChatRoomData = await API.graphql(
                graphqlOperation(
                    createChatRoom,
                    {
                        input: {

                        }
                    }
                )
            )

            if (!newChatRoomData.data)
            {
                console.log("Failed to create a chat room");
                return;
            }

            const newChatRoom = newChatRoomData.data.createChatRoom;

            console.log("Chat room data ", newChatRoom);

            // add user to chat room
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser,
                    {
                        input: {
                            userID: user.id,
                            chatRoomID: newChatRoom.id
                        }
                    }
                )
            );

            // add authenticated user to chat room
            const userInfo = await Auth.currentAuthenticatedUser();
            await API.graphql(
                graphqlOperation(
                    createChatRoomUser,
                    {
                        input: {
                            userID: userInfo.attributes.sub,
                            chatRoomID: newChatRoom.id
                        }
                    }
                )
            );
            navigation.navigate("ChatRoom", {
                id: newChatRoom.id,
                name: "HardCoded Name",
                uri: "https://avatars2.githubusercontent.com/u/33727291?s=460&u=4afe260b1d38daf898273cba9535455c34f2d07d&v=4"
            });
        } catch (error)
        {
            console.error(error);
        }
    };

    return (
        <TouchableOpacity onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{ uri: user.imageUri }} style={styles.avatar} />
                    <View style={styles.midContainer}>
                        <Text style={styles.username}>{user.name}</Text>
                        <Text style={styles.lastMessage}>{user.status}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default ContactListItem;