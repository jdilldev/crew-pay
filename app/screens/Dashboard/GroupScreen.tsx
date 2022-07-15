import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useApp, useUser } from '@realm/react';
import RealmContext, { Group, User } from '../../database'
import { Button, Text, TextInput, Vector, View } from '../../styles/styles';
import { FlatList, Modal, Pressable, SafeAreaView, Image } from 'react-native';
import { useAuthenticatedStore } from '../../GlobalUserSettingsContext';
const { useRealm, useQuery, useObject } = RealmContext
import WaitImage from '../../assets/svgs/frightened.svg'
import { Field } from '../../components/Field';

type GroupUsageType = 'unilateral' | 'shared'
const GroupScreen = () => {
    const realm = useRealm()
    const groups = useQuery(Group);
    const { currentUserID } = useAuthenticatedStore()
    const currentUser = currentUserID ? useObject(User, currentUserID) : null
    const [open, setOpen] = useState(false)

    const onSaveGroup = (name: string, description: string, invitees: string[], type: string) => {
        if (currentUser)
            try {
                realm.write(() => {
                    const newGroup = realm.create<Group>("Group", Group.generate({ name, description, initialUser: currentUserID, invitees, usageType: type }))
                    currentUser.addGroup(newGroup._id.toHexString())
                });
                setOpen(false)
            }
            catch (err) {
                console.log("Error creating Group: " + err);
            }
    }

    const AddGroupModal = () => {

        //fields 
        const [groupName, setGroupName] = useState('')
        const [groupMembers, setGroupMembers] = useState<string[]>([])
        const [description, setDescription] = useState('')
        const [groupType, setGroupType] = useState('shared')


        return <Modal
            animationType="slide"
            transparent={false}
            visible={open}
            onRequestClose={() => setOpen(false)}
        >
            <SafeAreaView style={{
                margin: 15,
                flex: 1,
            }}>
                <Vector name='close' width={10} height={10} style={{ padding: 8, alignSelf: 'flex-end' }} onPress={() => setOpen(false)} />
                <View flex={1} transparent>
                    <View alignItems='center' transparent>
                        <Text textAlign='center' size='small' type='secondary'>{`Group Leader: ${currentUser?.firstName}`}</Text>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={{ uri: `https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png` }} />
                    </View>
                    <Field value={groupName} setValue={setGroupName} fieldType='text' label='Name' noStyle />
                    <Field value={groupMembers} setValue={setGroupMembers} fieldType='tag-input' label='Invite' noStyle />
                    <Field value={description} setValue={setDescription} fieldType='text' label='Description' noStyle />
                    <Field value={groupType} setValue={setGroupType} fieldType='button-group' buttons={['Shared', 'Unilateral']} label='Card Usage' noStyle />
                    <View width={'100%'} orientation='row' justifyContent='space-around' >
                        <Button type='primary' weight='300' size="smallButton" text='Create Group' disabled={groupName === '' || groupMembers.length < 2} onPress={() => onSaveGroup(groupName, description, groupMembers, groupType)} />
                    </View>
                    <View flex={1} marginTop={5} borderRadius={10} backgroundColor={'palegreen'}>
                        <Text textAlign='center'>Suggested</Text>
                    </View>
                </View>
            </SafeAreaView>
        </Modal>
    }


    if (currentUserID && currentUser) {
        const GroupList = () => {
            return <View flex={1} margin={10}>
                <View orientation='row' justifyContent='flex-end' spacing={true}>
                    <Button style={{ borderWidth: 0 }} outlined icon={{ name: 'new-group', width: 30, height: 30 }} size='smallButton' text='' onPress={() => {
                        setOpen(true)
                    }} />
                </View>
                {
                    currentUser.pendingGroups.length > 0 &&
                    <View borderWidth={1} borderColor={'green'} >
                        <Text size='small' type='primary'>INVITES</Text>
                    </View>
                }
                <View flex={1}>
                    <Text size='small' type='primary'>GROUPS</Text>
                    <FlatList
                        data={groups}
                        keyExtractor={group => group._id.toString()}
                        renderItem={({ group: item }) => {
                            return <View borderColor={'gray'}>
                                <View orientation='row' alignItems='center' justifyContent='space-between' spacing={false}>
                                    <View orientation='row' alignItems='center'>
                                        <Text size='medium' fontWeight='normal' spacing={false}>{item.name}</Text>
                                        <Text marginTop={3} type='success' spacing={false}>{` ${300.00}`}</Text>
                                    </View>
                                    <View orientation='column' justifyContent='center'>
                                        <Button weight={'300'} type='primary' outlined size='smallButton' text='Use Card' onPress={() => console.log('using card modals')} />
                                    </View>
                                    {/*     <Text>{item.description}</Text> */}
                                </View>
                                <View marginLeft={10}>
                                    <Text fontWeight='300' size='default' type='default' spacing={false}>{`${item.usageType} Card ${item.usageType === 'unilateral' ? ' | Group Leader:' + item.owner : ''}`}</Text>
                                    <Text fontWeight='300' size='default' type='secondary' spacing={false}>{item.description || 'placeholder description'}</Text>
                                    <Text>{item.members?.join(' | ')}</Text>
                                </View>
                            </View>
                        }}
                    />
                </View>
                <AddGroupModal />
            </View >
        }

        return (
            <View flex={1}>
                {currentUser.applicationID
                    ? <GroupList />
                    : <View flex={1} justifyContent='center'>
                        <WaitImage
                            style={{
                                width: '100%',
                                height: '50%'
                            }} />
                        <Text fontWeight='200' textAlign='center' padding={10}>Uh oh! We need to to know a little bit about you before you can start grouping.</Text>
                    </View>
                }
            </View>
        );
    }
    return <Text>User does not exist</Text>

}

export default GroupScreen;