import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ChatListItem from '../components/ChatListItem';
import NewMessageButton from '../components/NewMessageButton';
import { View } from '../components/Themed';
import { API, graphqlOperation, Auth } from 'aws-amplify';

import { getUser } from './queries';
import { useEffect, useState } from 'react';

export default function ChatsScreen()
{
  const [chatRooms, setChatRooms] = useState({});

  useEffect(() =>
  {
    const fetchChatRooms = async () =>
    {
      try
      {
        const userInfo = await Auth.currentAuthenticatedUser();

        const userData = await API.graphql(
          graphqlOperation(
            getUser, {
            id: userInfo.attributes.sub
          }
          )
        )
        setChatRooms(userData.data.getUser.chatRoomUser.items)
        console.log("user data ", userData);
      } catch (e)
      {
        console.error(e);
      }
    }
    fetchChatRooms();
  }, [])

  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        keyExtractor={(item) => (item.id)}
        data={chatRooms}
        renderItem={({ item }) => (
          <ChatListItem
            chatRoom={item.chatRoom} />
        )} />
      <NewMessageButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
