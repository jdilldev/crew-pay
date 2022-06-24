import React, { useEffect } from 'react'
import { View, Text, Icon, Button } from '../../styles/styles'
import Logo from '../../assets/svgs/OTP-phone.svg'
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/Constants'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useApp, useUser } from '@realm/react';
import RealmContext, { Group, User } from '../../database'
const { useRealm, useQuery, useObject } = RealmContext
import GroupScreen from './GroupScreen';
import FundsScreen from './FundsScreen';
import ActivityScreen from './ActivityScreen';
import ProfileDetails from './ProfileDetails';


const Tab = createBottomTabNavigator();
const DashboardStack = createNativeStackNavigator();



const Dashboard = () => {
    const realm = useRealm()
    const user = useUser()
    const users = useQuery(User);

    return (
        <NavigationContainer>
            <Tab.Navigator
                id='dashboard-navigator'
                backBehavior='history'
                initialRouteName='Activity'
                screenOptions={({ route }) => ({
                    tabBarActiveTintColor: 'tomato',
                    tabBarInactiveTintColor: 'gray',
                })}>
                <Tab.Screen name="Activity"
                    component={ActivityScreen}
                    options={{
                        tabBarBadge: undefined,
                        tabBarIcon: () => <Icon pack='ion' icon='list-circle-outline' />
                    }} />
                <Tab.Screen name="Funds" component={FundsScreen}
                    options={{
                        tabBarIcon: () => <Icon pack='material' icon='attach-money' />
                    }}
                />
                <Tab.Screen name="Groups" component={GroupScreen}
                    options={{
                        tabBarIcon: () => <Icon pack='simple' icon='people' />
                    }}
                />
                <Tab.Screen name="Profile" component={ProfileDetails}
                    options={{
                        tabBarIcon: () => <Icon pack='simple' icon='settings' />
                    }}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Dashboard