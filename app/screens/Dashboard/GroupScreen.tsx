import React, { useEffect } from 'react'
import { useApp, useUser } from '@realm/react';
import RealmContext, { Group, User } from '../../database'
import { Button, Text, View } from '../../styles/styles';
import { FlatList } from 'react-native';
import { useAuthenticatedStore } from '../../GlobalUserSettingsContext';
const { useRealm, useQuery, useObject } = RealmContext
import WaitImage from '../../assets/svgs/frightened.svg'

const GroupScreen = () => {
    const realm = useRealm()
    const groups = useQuery(Group);
    const { currentUserID } = useAuthenticatedStore()
    const currentUser = currentUserID ? useObject(User, currentUserID) : null

    if (currentUserID && currentUser) {
        const GroupList = () => {
            return <>
                <FlatList
                    data={groups}
                    keyExtractor={task => task._id.toString()}
                    renderItem={({ item }) => {
                        return <View>
                            <Text>{item.name}</Text>
                            {/*     <Text>{item.description}</Text> */}
                        </View>
                    }}
                />

                <Button text='Add Group' onPress={() => {
                    try {
                        realm.write(() => {
                            const newGroup = realm.create<Group>("Group", Group.generate('name', 'breif desc', currentUserID));
                            currentUser.addGroup(newGroup._id.toHexString())
                        });
                    } catch (err) {
                        console.log("Error creating Group: " + err);
                    }
                }} />
            </>
        }

        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <WaitImage
                    style={{
                        width: '100%',
                        height: '50%'
                    }} />
                {currentUser.applicationID ? <GroupList /> : <Text fontWeight='200' textAlign='center' padding={10}>Uh oh! We need to to know a little bit about you before you can start grouping.</Text>}
            </View>
        );
    }
    return <Text>User does not exist</Text>

}

export default GroupScreen;