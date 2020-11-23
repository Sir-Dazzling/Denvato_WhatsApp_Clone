import { MaterialCommunityIcons, Octicons, Fontisto, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import { ColorSchemeName, Image, StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import Colors from '../constants/Colors';
import ChatRoomScreen from '../screens/ChatRoomScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import TopTabNavigator from './MainTabNavigator';


// If you are not familiar with React Navigation, we recommend going through the
// "Fundamentals" guide: https://reactnavigation.org/docs/getting-started
export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName })
{

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
      theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <RootNavigator />
    </NavigationContainer>
  );
}

// A root stack navigator is often used for displaying modals on top of all other content
// Read more here: https://reactnavigation.org/docs/modal
const Stack = createStackNavigator<RootStackParamList>();

function RootNavigator()
{
  return (
    <Stack.Navigator screenOptions={{
      headerStyle: {
        backgroundColor: Colors.light.tint,
        shadowOpacity: 0,
        elevation: 0
      },
      headerTintColor: Colors.dark.text,
      headerTitleAlign: "left",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }}>
      <Stack.Screen
        name="Root"
        component={TopTabNavigator}
        options={{
          title: "Denvato Chat",
          headerRight: () => (
            <View style={styles.headerIconsContainer}>
              <Octicons name="search" size={22} color={"white"} />
              <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
            </View>
          )
        }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
      <Stack.Screen
        name="ChatRoom"
        component={ChatRoomScreen}
        options={({ route, navigation }: any) => ({
          title: route.params.name,
          headerTitleStyle: {
            fontWeight: "normal",
            borderWidth: 2,
            paddingVertical: 10,
            maxWidth: "60%"
          },
          headerLeft: () => (
            <TouchableHighlight
              style={styles.headerLeftContainer}
              onPress={() => navigation.goBack()
              }>
              <>
                <MaterialCommunityIcons name="arrow-left" size={22} color="white" />
                <Image style={{
                  borderWidth: 4,
                  width: 35,
                  height: 35,
                  borderRadius: 50,
                }} source={{ uri: route.params.uri }} />
              </>
            </TouchableHighlight>
          ),
          headerTitle: () => (
            <TouchableHighlight
              style={styles.headerContainer}
              onPress={() => console.log("pressed smtin")}>
              <Text style={{
                color: "#fff",
                fontSize: 22
              }}>dshj</Text>
            </TouchableHighlight>
          ),
          headerRight: () => (
            <View style={styles.headerRightContainer}>
              <FontAwesome5 name="video" size={22} color="white" />
              <MaterialIcons name="call" size={22} color="white" />
              <MaterialCommunityIcons name="dots-vertical" size={22} color="white" />
            </View>
          )
        })}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  headerIconsContainer:
  {
    flexDirection: "row",
    backgroundColor: "transparent",
    width: 60,
    justifyContent: "space-between",
    marginRight: 10
  },
  headerLeftContainer:
  {
    flexDirection: "row",
    backgroundColor: "transparent",
    width: 60,
    justifyContent: "space-evenly",
    marginLeft: 10,
    alignItems: "center",
    borderRadius: 40,
    paddingRight: 10
  },
  headerContainer:
  {
    paddingVertical: 10,
    width: "80%"
  },
  headerRightContainer:
  {
    flexDirection: "row",
    backgroundColor: "transparent",
    width: 100,
    justifyContent: "space-between",
    marginRight: 10
  }
});