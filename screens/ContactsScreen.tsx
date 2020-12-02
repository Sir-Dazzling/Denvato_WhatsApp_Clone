import { API, graphqlOperation } from 'aws-amplify';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import ContactListItem from '../components/ContactListItem';
import { View } from '../components/Themed';
import Users from '../data/Users';
import { listUsers } from '../graphql/queries';

export default function ContactsScreen()
{
  const [users, setUsers] = useState([]);

  useEffect(() =>
  {
    const fetchUsers = async () =>
    {
      try
      {
        const usersData = await API.graphql(graphqlOperation(listUsers));
        setUsers(usersData.data.listUsers.items);
      } catch (error)
      {
        console.error(error);
      }
    };
    fetchUsers();
  }, [])
  return (
    <View style={styles.container}>
      <FlatList
        style={{ width: "100%" }}
        keyExtractor={(item) => (item.id)}
        data={users}
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
