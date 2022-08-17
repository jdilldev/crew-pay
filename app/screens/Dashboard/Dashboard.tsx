import React, { useEffect } from 'react'
import { Button, Vector, } from '../../styles/styles'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RealmContext from '../../database'
import GroupScreen from './GroupScreen';
import FundsScreen from './FundsScreen';
import ActivityScreen from './ActivityScreen';
import ProfileDetails from './Profile/ProfileDetails';
import { Image, Pressable } from 'react-native';
import { useUser } from '@realm/react';
import { useAuthenticatedStore } from '../../GlobalUserSettingsContext';
const Tab = createBottomTabNavigator();
const DashboardStack = createNativeStackNavigator();
import AddGroupIcon from '../../assets/svgs/users.svg'
import PiggyBankIcon from '../../assets/svgs/wallet-cash.svg'
import MegaphoneIcon from '../../assets/svgs/megaphone.svg'
import UserProfileIcon from '../../assets/svgs/abstract-octopus.svg'
import LogoutIcon from '../../assets/svgs/logout.svg'
import { useThemeColor } from '../../components/Themed';


const Dashboard = () => {
    const { setCurrentUserID } = useAuthenticatedStore()
    const user = useUser()
    const backgroundColor = useThemeColor({}, 'background')
    const color = useThemeColor({}, 'text')
    const primaryColor = useThemeColor({}, 'primary')
    const dividerColor = 'lightgray'

    useEffect(() => {
        if (user)
            setCurrentUserID(user.id)
    }, [user])

    return (
        <NavigationContainer >
            <Tab.Navigator
                id='dashboard-navigator'
                backBehavior='history'
                initialRouteName='Activity'
                screenOptions={({ route }) => ({
                    headerStyle: {
                        backgroundColor,
                        borderBottomColor: dividerColor,
                        borderBottomWidth: 1
                    },
                    headerTitleStyle: {
                        fontWeight: 'bold',
                        color
                    },
                    tabBarIcon: ({ size, color }) => {
                        switch (route.name) {
                            case 'Activity':
                                return <MegaphoneIcon fill={color} width={40} height={40} />
                            case 'Funds':
                                return <PiggyBankIcon fill={color} width={40} height={40} />
                            case 'Groups':
                                return <AddGroupIcon fill={color} width={40} height={40} />
                            case 'Profile':
                                return <UserProfileIcon fill={color} width={40} height={40} />
                        }
                    },
                    tabBarStyle: {
                        height: '10%',
                        padding: 5,
                        backgroundColor
                    },
                    tabBarLabelStyle: { fontSize: 12 },

                    tabBarActiveTintColor: primaryColor,
                    tabBarInactiveTintColor: 'gray',
                })}>
                <Tab.Screen name="Activity"
                    component={ActivityScreen}
                    options={{
                        tabBarBadge: undefined,
                        tabBarBadgeStyle: { backgroundColor: primaryColor, fontWeight: 'bold' },
                    }} />
                <Tab.Screen name="Funds" component={FundsScreen} />
                <Tab.Screen name="Groups" component={GroupScreen} />
                <Tab.Screen name="Profile" component={ProfileDetails}
                />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

export default Dashboard