import React, { useEffect } from 'react'
import { View, Text, Icon, Button } from '../styles/styles'
import Logo from '../../assets/svgs/OTP-phone.svg'
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../constants/Constants'
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useApp, useUser } from '@realm/react';
import { Realm } from "@realm/react";
import RealmContext, { Group, User } from '../database'
import { BSON } from 'realm';
const { useRealm, useQuery, useObject } = RealmContext

const HomeScreen = () => {
    const app = useApp();
    const user = useUser();
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button text='logout' onPress={() => user?.logOut()} />
        </View>
    );
}

const GroupScreen = () => {
    const app = useApp();
    const user = useUser();
    const realm = useRealm()
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button text='Add Group' onPress={() => {
                console.log('want to create a group')
                try {
                    realm.write(() => {
                        realm.create<Group>("Group", {
                            _id: String(Math.floor(Math.random() * (10 - 1 + 1) + 1)),
                            name: 'fun squad',
                            members: ['zoe', 'landon', 'rob'],
                            description: 'testing fun',
                            createdAt: new Date()
                        });
                    });
                } catch (err) {
                    console.log("Error creating Group: " + err);
                }
            }

                /*    const user = realm.objectForPrimaryKey("User", user_id); // search for a realm object with a primary key that is an int.
   
                   if (!user) //if the user does not exist in the DB, create one, otherwise, prompt for passcode
                       try {
                           realm.write(() => {
                               realm.create("User",
                                   {
                                       _id: user_id,
                                       nationality: countryCode,
                                       phone: userPhone || undefined,
                                       email: userEmail || undefined
                                   });
                           });
                       } catch (err) {
                           console.log("Error creating User: " + err);
                       }*/
            } />
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
    const app = useApp();
    const user = useUser();
    const realm = useRealm()
    const result = useQuery(Group);
    const groups = realm.objects("Group");
    const users = realm.objects("User");


    useEffect(() => {
        realm.subscriptions.update(mutableSubs => {
            mutableSubs.add(realm.objects(Group));
        });
    }, [realm, result]);


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
                <Tab.Screen name="Groups" component={GroupScreen}
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
        </NavigationContainer>
    );
}

export default Dashboard