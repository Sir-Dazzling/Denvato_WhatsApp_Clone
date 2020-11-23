import { format, formatDistanceToNow } from 'date-fns';
import React from 'react';
import { Text, View } from 'react-native';
import { Message } from '../../types';
import styles from './style';


export type ChatMessageProps =
    {
        message: Message;
    };

const ChatMessage = (props: ChatMessageProps) => 
{
    const { message } = props;

    const isMyMessage = () => 
    {
        return message.user.id === "u1";
    };

    return (
        <View style={styles.container}>
            <View style={[
                styles.messageBox,
                {
                    backgroundColor: isMyMessage() ? "grey" : "#fff",
                    marginLeft: isMyMessage() ? 50 : 0,
                    marginRight: isMyMessage() ? 0 : 50
                }
            ]}>
                {!isMyMessage() && <Text style={styles.name}>
                    {message.user.name}
                </Text>}
                <Text
                    style={[
                        styles.message,
                        {
                            color: isMyMessage() ? "#fff" : "#000000"
                        }
                    ]}>{message.content}</Text>
                <Text
                    style={[
                        styles.time,
                        {
                            color: isMyMessage() ? "#fff" : "grey"
                        }
                    ]}>{formatDistanceToNow(
                        new Date(
                            Date.parse(message.createdAt)
                        )
                    )} ago
                </Text>
            </View>
        </View>
    );
};

export default ChatMessage;