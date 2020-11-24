import { useNavigation } from '@react-navigation/native';
import { format } from 'date-fns';
import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { User } from '../../types';
import styles from './style';

export type ContactListItemProps =
    {
        user: User;
    };

const ContactListItem = (props: ContactListItemProps) => 
{
    const { user } = props;

    const userAvatar = "https://avatars2.githubusercontent.com/u/33727291?s=460&u=4afe260b1d38daf898273cba9535455c34f2d07d&v=4";

    const navigation = useNavigation();

    const onClick = () => 
    {
        // Navigate to chat room with specific user
    };

    return (
        <TouchableOpacity onPress={onClick}>
            <View style={styles.container}>
                <View style={styles.leftContainer}>
                    <Image source={{ uri: userAvatar }} style={styles.avatar} />
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