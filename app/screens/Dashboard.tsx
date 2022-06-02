import React from 'react'
import { View, Text, Icon } from '../styles/styles'
import Logo from '../../assets/svgs/OTP-phone.svg'
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../constants/Constants'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

function HomeScreen() {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Home!</Text>
        </View>
    );
}

function SettingsScreen() {
    return (
        <View flex={1}>
            <Text>Settings!</Text>
        </View>
    );
}

const Tab = createBottomTabNavigator();
const DashboardStack = createNativeStackNavigator();

const Dashboard = () => {

    return (
        <Tab.Navigator
            id='dashboard-navigator'
            backBehavior='history'
            initialRouteName='Activity'
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}>
            <Tab.Screen name="Activity"
                component={HomeScreen}
                options={{
                    tabBarBadge: undefined,
                    tabBarIcon: () => <Icon pack='ion' icon='list-circle-outline' />
                }} />
            <Tab.Screen name="Funds" component={HomeScreen}
                options={{
                    tabBarIcon: () => <Icon pack='material' icon='attach-money' />
                }}
            />
            <Tab.Screen name="Spend" component={HomeScreen}
                options={{
                    tabBarIcon: () => <Icon pack='ion' icon='card-outline' />
                }}
            />
            <Tab.Screen name="Groups" component={SettingsScreen}
                options={{
                    tabBarIcon: () => <Icon pack='simple' icon='people' />
                }}
            />
            <Tab.Screen name="Settings" component={SettingsScreen}
                options={{
                    tabBarIcon: () => <Icon pack='simple' icon='settings' />
                }}
            />
        </Tab.Navigator>
    );
}

export default Dashboard