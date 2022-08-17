import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useApp, useUser } from '@realm/react';
import RealmContext, { Group, User } from '../../database'
import { Button, Divider, Text, TextInput, Vector, View } from '../../styles/styles';
import Modal from "react-native-modal";
import { Modal as DefaultModal, FlatList, ListRenderItem, SafeAreaView, Image, Pressable, Button as DefaultButton } from 'react-native';
import { useAuthenticatedStore } from '../../GlobalUserSettingsContext';
const { useRealm, useQuery, useObject } = RealmContext
import WaitImage from '../../assets/svgs/frightened.svg'
import { Field } from '../../components/Field';
import { capitalize } from '../../utils'
import { DEVICE_WIDTH, MAX_CHARS_GROUP_NAME } from '../../constants/Constants';
import { hasHardwareAsync, isEnrolledAsync, authenticateAsync } from 'expo-local-authentication'

const handleBiometricAuth = async () => {
    const savedBiometrics = await isEnrolledAsync();
    if (!savedBiometrics)
        console.log('yikes')
    else {
        const { success } = await authenticateAsync({
            promptMessage: 'Authenticate request to spend $$',
            disableDeviceFallback: false,
        });
        if (success) {
            console.log('send that request to every one')
        }
    }

}

type GroupUsageType = 'unilateral' | 'shared'
const GroupScreen = () => {
    const realm = useRealm()
    const groups = useQuery(Group);
    const { currentUserID } = useAuthenticatedStore()
    const currentUser = currentUserID ? useObject(User, currentUserID) : null
    const [open, setOpen] = useState(false)
    const [selectedGroup, setSelectedGroup] = useState<(Group & Realm.Object) | null>(null)
    const [isBiometricSupported, setIsBiometricSupported] = useState(false);

    // Check if hardware supports biometrics
    useEffect(() => {
        (async () => {
            const compatible = await hasHardwareAsync();
            setIsBiometricSupported(compatible);
        })();
    });


    const onSaveGroup = (name: string, description: string, initialMembers: string[], type: string) => {
        if (currentUser)
            try {
                realm.write(() => {
                    const newGroup = realm.create<Group>("Group", Group.generate({ name, description, initialUser: currentUserID, initialMembers, usageType: type }))

                    currentUser.pendingGroups.push(newGroup._id.toHexString())
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


        const isGroupButtonDisabled = () => {
            return false
            // return groupName === '' || groupName.length > MAX_CHARS_GROUP_NAME || groupMembers.length < 2 || description === ''
        }

        return <DefaultModal
            animationType='slide'
            visible={open}
            onRequestClose={() => setOpen(false)}
        >
            <SafeAreaView style={{
                flex: 1,
            }}>
                <Vector name='close' width={10} height={10} style={{ padding: 8, alignSelf: 'flex-end' }} onPress={() => setOpen(false)} />
                <View flex={1} padding={10}>
                    <View alignItems='center'>
                        <Text textAlign='center' size='small' type='secondary'>{`Group Leader: ${currentUser?.firstName}`}</Text>
                        <Image
                            style={{ width: 100, height: 100 }}
                            source={{ uri: `https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png` }} />
                    </View>
                    <Field value={groupName} setValue={setGroupName} fieldType='text' label='Name' noStyle maxChars={MAX_CHARS_GROUP_NAME} />
                    <Field value={groupMembers} setValue={setGroupMembers} fieldType='tag-input' label='Invite' noStyle />
                    <Field value={description} setValue={setDescription} fieldType='text' multiline={true} label='Description' noStyle />
                    <Field value={groupType} setValue={setGroupType} fieldType='button-group' buttons={['shared', 'unilateral']} label='Card Usage' noStyle />
                    <View width={'100%'} orientation='row' justifyContent='space-around' >
                        <Button type='primary' weight='normal' size="smallButton" text='Create Group' disabled={isGroupButtonDisabled()} onPress={() => onSaveGroup(groupName, description, groupMembers, groupType)} />
                    </View>
                    <View flex={1} marginTop={5} borderRadius={10} backgroundColor={'palegreen'}>
                        <Text textAlign='center'>Suggested</Text>
                    </View>
                </View>
            </SafeAreaView>
        </DefaultModal>
    }


    const UseCardModal = () => {
        //fields 
        const [description, setDescription] = useState('')
        const image = { uri: "https://cdn4.iconfinder.com/data/icons/logos-3/600/React.js_logo-512.png" };


        const isGroupButtonDisabled = () => {
            return false
            // return groupName === '' || groupName.length > MAX_CHARS_GROUP_NAME || groupMembers.length < 2 || description === ''
        }

        return selectedGroup ? <Modal
            style={{ margin: 0 }}
            isVisible={selectedGroup !== null}
            onBackdropPress={() => setSelectedGroup(null)}>
            <SafeAreaView
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <View
                    style={{
                        marginTop: 'auto',
                        width: '100%',
                        minHeight: '30%',
                        maxHeight: 'auto',
                        justifyContent: 'space-between',
                        padding: 10
                    }}>
                    <View>
                        <View padding={5} orientation='row' alignItems='center' justifyContent='space-between'>
                            <View orientation='row' alignItems='center'>
                                <Image
                                    style={{ width: 50, height: 50, marginRight: 10 }}
                                    source={{ uri: `https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png` }} />
                                <Text fontWeight='200'>{selectedGroup.name}</Text>
                            </View>
                            <DefaultButton title='Cancel' onPress={() => setSelectedGroup(null)} />
                        </View>
                        <Divider />
                        <Text fontWeight='200'>Transaction Details</Text>
                        <View orientation='row' justifyContent='flex-start'>
                            <Field width='30%' value={description} setValue={setDescription} fieldType='text' label='Purchase Amount' noStyle />
                        </View>
                        <Field value={description} setValue={setDescription} fieldType='text' label='Purchase Description' noStyle />
                        <View marginLeft={20} >
                            <View alignItems='center' orientation='row' justifyContent='space-between'>
                                <Text size='small' fontWeight='300'>Remaining after purchase</Text>
                                <Text type='success'>$0.00</Text>
                            </View>
                            <View alignItems='flex-start' orientation='row' justifyContent='space-between'>
                                <Text size='small' fontWeight='300'>Upload Photo (optional)</Text>
                                <Image
                                    style={{ width: 50, height: 50, }}
                                    source={{ uri: `https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png` }} />
                            </View>
                        </View>
                    </View>
                    <DefaultButton title='Send Request' onPress={handleBiometricAuth} />
                </View>
            </SafeAreaView>
        </Modal>
            : null
    }


    if (currentUserID && currentUser) {
        const GroupList = () => {
            return <View flex={1} >
                <View orientation='row' justifyContent='flex-end' spacing={true}>
                    <Button style={{ borderWidth: 0 }} outlined icon={{ name: 'new-group', width: 30, height: 30 }} size='smallButton' text='' onPress={() => {
                        setOpen(true)
                    }} />
                </View>
                {
                    currentUser.pendingGroups.length > 0 &&
                    <View borderWidth={0} borderColor={'green'}>
                        <Text paddingLeft={10} backgroundColor={'lightblue'} size='default' type='primary'>PENDING</Text>
                        <FlatList
                            data={groups.filter(({ _id }) => currentUser.pendingGroups.indexOf(_id.toHexString()) !== -1)}
                            keyExtractor={task => task._id.toString()}
                            renderItem={({ item }) => {
                                return <View spacing={true} paddingHorizontal={10}>
                                    <View orientation='row' alignItems='center' justifyContent='space-between'>
                                        <Text flex={1} spacing={false}>{item.name}</Text>
                                        {item.owner !== currentUserID &&
                                            <Button outlined size='smallButton' text='Join' onPress={() => {
                                                if (!item.isActive) {
                                                    realm.write(() => {
                                                        item.isActive = true;
                                                    });
                                                }
                                                realm.write(() => {
                                                    currentUser.pendingGroups = currentUser.pendingGroups.filter(groupId => groupId !== item._id.toHexString())
                                                    currentUser.groups = [item._id.toHexString(), ...currentUser.groups]
                                                });

                                            }
                                            } />
                                        }
                                    </View>
                                    <Text spacing={false} type={'secondary'} size='small'>{`${item.owner === currentUserID ? 'Waiting for one other to accept the invite' : 'Accept the invitation to joing the group'}`}</Text>
                                </View>
                            }}
                        />
                    </View>
                }
                <View flex={1}>
                    <Text paddingLeft={10} backgroundColor={'lightblue'} size='default' type='primary' >ACTIVE</Text>
                    <FlatList
                        style={{ padding: 10 }}
                        data={groups.filter(({ _id }) => currentUser.pendingGroups.indexOf(_id.toHexString()) === -1)}
                        keyExtractor={task => task._id.toString()}
                        ListEmptyComponent={() =>
                            <View marginTop={'20%'} justifyContent='center' alignItems='center'>
                                <Text size='medium' textAlign='center' type='warning' fontWeight='300'>
                                    {`No active groups, click the icon to create a group${currentUser.pendingGroups.length > 0 ? ', or accept a group invitation' : ''}`}
                                </Text>
                            </View>
                        }
                        renderItem={({ item }) => {
                            return <Pressable onPress={() => console.log(item.name)}>
                                <View orientation='row' alignItems='center' justifyContent='space-between' spacing={false}>
                                    <View orientation='row' alignItems='center'>
                                        <Text size='medium' fontWeight='normal' spacing={false}>{item.name}</Text>
                                    </View>
                                    {(item.usageType === 'shared' || (item.owner === currentUserID)) &&
                                        <View orientation='column' justifyContent='center'>
                                            <Button weight={'300'} type='primary' outlined size='smallButton' text='Use Card' onPress={() => setSelectedGroup(item)} />
                                        </View>
                                    }
                                    {/*     <Text>{item.description}</Text> */}
                                </View>
                                <View marginLeft={10}>
                                    <Text marginTop={3} type={item.available === 0 ? 'pending' : item.available! < 0 ? 'error' : 'success'} spacing={false}>{`Available Funds: $${item.available ? (item.available / 100).toLocaleString("en-US", { style: "currency", currency: "USD" }) : '0.00'}`}</Text>
                                    <Text textTransform='capitalize' fontWeight='300' size='default' type='secondary' spacing={false}>{`${capitalize(item.usageType)} Card ${item.usageType === 'unilateral' ? ' | Group Leader:' + item.owner : ''}`}</Text>
                                    <Text fontWeight='300' size='default' type='default' spacing={false}>{item.description || 'placeholder description'}</Text>
                                    <Text type='primary'>{item.members?.join(' | ')}</Text>
                                </View>
                            </Pressable>
                        }}
                    />
                </View>
                <AddGroupModal />
                <UseCardModal />
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
                        <Text fontWeight='200' textAlign='center'>Uh oh! We need to to know a little bit about you before you can start grouping.</Text>
                    </View>
                }
            </View>
        );
    }
    return <Text>User does not exist</Text>

}

export default GroupScreen;