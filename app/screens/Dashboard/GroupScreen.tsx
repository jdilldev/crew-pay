import React, { useEffect } from 'react'
import { useApp, useUser } from '@realm/react';
import RealmContext, { Group, User } from '../../database'
import { Button, Text, View } from '../../styles/styles';
import { FlatList } from 'react-native';
const { useRealm, useQuery, useObject } = RealmContext

const GroupScreen = () => {
    const app = useApp();
    const user = useUser();
    const realm = useRealm()
    const users = useQuery(User);
    let person: any;
    if (user?.id)
        person = useObject(User, user.id)

    const tasks = useQuery(Group);
    console.log(tasks)


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Button text='Add Group' onPress={() => {
                console.log('want to create a group')
                try {
                    realm.write(() => {
                        if (user?.id) {
                            const newGroup = realm.create<Group>("Group", Group.generate('name', 'breif desc', user.id));
                            person.groups = [...person.groups, newGroup._id.toString()]
                        }
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
            <View flex={1}>
                <FlatList
                    data={tasks}
                    keyExtractor={task => task._id.toString()}
                    renderItem={({ item }) => {
                        return <Text>{item.name}</Text>
                    }}
                />
            </View>
        </View>
    );
}

export default GroupScreen;