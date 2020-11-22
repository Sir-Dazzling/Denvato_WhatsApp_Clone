import { Ionicons } from '@expo/vector-icons';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import CallsScreen from '../screens/CallsScreen';
import StatusScreen from '../screens/StatusScreen';
import CameraScreen from '../screens/CameraScreen';
import ChatsScreen from '../screens/ChatsScreen';
import
{
  CameraParamList,
  ChatsParamList,
  StatusParamList,
  CallsParamList,
  TopTabParamList
} from '../types';
import { Fontisto } from "@expo/vector-icons";

const TopTab = createMaterialTopTabNavigator<TopTabParamList>();

export default function BottomTabNavigator()
{
  const colorScheme = useColorScheme();

  return (
    <TopTab.Navigator
      initialRouteName="Chats"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].background,
        style: {
          backgroundColor: Colors[colorScheme].tint
        },
        indicatorStyle: {
          backgroundColor: Colors[colorScheme].background,
          height: 2.5
        },
        labelStyle: {
          fontWeight: "bold"
        },
        showIcon: true
      }}>
      <TopTab.Screen
        name="Camera"
        component={CameraNavigator}
        options={{
          tabBarIcon: ({ color }) => <Fontisto name="camera" color={color} size={20} />,
          tabBarLabel: () => null,
        }}
      />
      <TopTab.Screen
        name="Chats"
        component={ChatsNavigator}
      />
      <TopTab.Screen
        name="Status"
        component={StatusNavigator}
      />
      <TopTab.Screen
        name="Calls"
        component={CallsNavigator}
      />
    </TopTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string })
{
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const CameraStack = createStackNavigator<CameraParamList>();

function CameraNavigator()
{
  return (
    <CameraStack.Navigator>
      <CameraStack.Screen
        name="TabOneScreen"
        component={CameraScreen}
        options={{
          headerTitle: 'Tab One Title',
          headerShown: false
        }}
      />
    </CameraStack.Navigator>
  );
}

const ChatsStack = createStackNavigator<ChatsParamList>();

function ChatsNavigator()
{
  return (
    <ChatsStack.Navigator>
      <ChatsStack.Screen
        name="TabTwoScreen"
        component={ChatsScreen}
        options={{
          headerTitle: 'Tab Two Title',
          headerShown: false
        }}
      />
    </ChatsStack.Navigator>
  );
}
const StatusStack = createStackNavigator<StatusParamList>();

function StatusNavigator()
{
  return (
    <StatusStack.Navigator>
      <StatusStack.Screen
        name="StatusScreen"
        component={StatusScreen}
        options={{
          headerTitle: 'Status',
          headerShown: false
        }}
      />
    </StatusStack.Navigator>
  );
}
const CallsStack = createStackNavigator<CallsParamList>();

function CallsNavigator()
{
  return (
    <CallsStack.Navigator>
      <CallsStack.Screen
        name="CallsScreen"
        component={CallsScreen}
        options={{
          headerTitle: 'Tab Two Title',
          headerShown: false
        }}
      />
    </CallsStack.Navigator>
  );
}
