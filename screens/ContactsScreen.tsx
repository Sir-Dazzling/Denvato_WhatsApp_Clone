import * as React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ChatListItem from '../components/ChatListItem';
import ContactListItem from '../components/ContactListItem';
import NewMessageButton from '../components/NewMessageButton';
import { View } from '../components/Themed';
import Users from '../data/Users';


export default function ContactsScreen()
{
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        keyExtractor={(item) => (item.id)}
        data={Users}
        renderItem={({ item }) => (
          <ContactListItem
            user={item} />
        )} />
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
