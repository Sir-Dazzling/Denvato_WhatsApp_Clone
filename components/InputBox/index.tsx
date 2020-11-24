import { Entypo, FontAwesome5, Fontisto, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import styles from './styles';

const InputBox = () => 
{
    const [message, setMessage] = useState("");

    const onMicrophonePress = () => 
    {
        console.log("Recording Voice note");

    };

    const onSendPress = () => 
    {
        console.warn(`Sending: ${message}`);

        // Send message to backend

        // Clearing state of message after a message has been sent
        setMessage("");
    };

    const onPress = () => 
    {
        if (!message)
        {
            onMicrophonePress();
        } else
        {
            onSendPress();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.mainContainer}>
                <FontAwesome5 name="laugh-beam" size={24} color="grey" />
                <TextInput
                    placeholder="Type a message"
                    style={styles.textInput}
                    multiline
                    maxLength={200}
                    value={message}
                    onChangeText={setMessage} />
                <Entypo
                    style={styles.icon}
                    name="attachment"
                    size={24}
                    color="grey" />
                {!message && <Fontisto
                    style={styles.icon}
                    name="camera"
                    size={24}
                    color="grey" />}
            </View>
            <TouchableOpacity
                onPress={onPress}>
                <View style={styles.buttonContainer}>
                    {!message ? <MaterialCommunityIcons
                        name="microphone"
                        size={28}
                        color="white" />
                        : <MaterialIcons
                            name="send"
                            size={28}
                            color="white" />}

                </View>
            </TouchableOpacity>
        </View>
    );
};

export default InputBox;