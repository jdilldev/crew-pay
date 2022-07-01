import { useUser } from '@realm/react';
import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import { Button, Modal, Pressable, SafeAreaView, TextInput } from 'react-native';
import { Icon, Text, View, } from '../../../styles/styles'
import RealmContext, { User } from '../../../database'
import { ApplicationStatus } from "@unit-finance/unit-node-sdk";
import { useAuthenticatedStore } from '../../../GlobalUserSettingsContext';
const { useRealm, useQuery, useObject } = RealmContext
import HomeIcon from '../../../assets/svgs/home.svg'
import CalendarIcon from '../../../assets/svgs/calendar.svg'
import UserIcon from '../../../assets/svgs/male-user.svg'
import LicenseIcon from '../../../assets/svgs/license.svg'
import PhoneIcon from '../../../assets/svgs/smartphone.svg'
import Logo from '../../../assets/svgs/logo.svg'

import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColor } from '../../../components/Themed';
import useColorScheme from '../../../hooks/useColorScheme';
{/* <LinearGradient style={{ width: 40, height: 40, borderRadius: 40, justifyContent: 'center', alignItems: 'center', display: 'flex' }} colors={['#467e7c', '#9dd8c2',]}>{icon}</LinearGradient>
 */}
type FieldProps = {
    label: string,
    icon?: ReactNode,
}

const Field = ({ icon, label }: FieldProps) => {
    const [value, setValue] = useState('')

    return <View orientation='row' transparent alignItems='center'>
        {icon}
        <TextInput style={{ fontSize: 17, marginTop: 5, marginHorizontal: 15, borderWidth: 1, borderColor: 'black', borderRadius: 20, minWidth: 250, maxWidth: 250, overflow: 'scroll', padding: 10 }} placeholder={label} value={value} onChangeText={setValue} />
    </View>
}
const Application = ({ openFromProfile, setOpenFromProfile }: { openFromProfile: boolean, setOpenFromProfile: (open: boolean) => void }) => {
    const user = useUser();
    const { currentUserID } = useAuthenticatedStore()
    const currentUser = currentUserID ? useObject(User, currentUserID) : null
    const applicationID = currentUser ? currentUser.applicationID : null
    const [applicationModalVisibile, setApplicationModalVisible] = useState(!applicationID)


    console.log(useColorScheme())
    const r = useThemeColor({}, 'background')

    const handleClose = () => {
        setApplicationModalVisible(false)
        setOpenFromProfile(false)
    }
    // get created at value for all objects and embedded objects and sort them and color them by type
    return <Modal
        animationType="slide"
        transparent={true}
        visible={applicationModalVisibile || openFromProfile}
        onRequestClose={() => handleClose()}>
        <SafeAreaView style={{
            flex: 1.5,
            justifyContent: 'center',
            alignItems: "center",
            backgroundColor: 'transparent',
        }}>
            <View backgroundColor={r} style={{ width: '87%', height: '80%' }} borderRadius={20} display='flex' justifyContent='space-between' padding={10}>
                <Text fontWeight='200' size='medium' alignSelf='center' spacing={false}>Application Details</Text>
                <View orientation='row' transparent alignItems='flex-start'>
                    <UserIcon fill={'black'} width={30} height={30} />
                    <View transparent>
                        <Field
                            label={'First Name'}
                        />
                        <Field
                            label={'Last Name'}
                        />
                    </View>
                </View>

                <Field
                    icon={<Icon icon='screen-smartphone' pack='simple' size='large' />}
                    label={'Phone'}
                />
                <Field
                    icon={<Icon icon='alternate-email' pack='material' />}
                    label={'Email'}
                />
                <Field
                    icon={<HomeIcon fill={'black'} width={30} height={30} />}
                    label={'Address'}
                />
                <View orientation='row' transparent alignItems='flex-start'>
                    <LicenseIcon fill={'black'} width={30} height={30} />
                    <View transparent>
                        <Field
                            label={'Identification Type'}
                        />
                        <Field
                            label={'Identification Number'}
                        />
                    </View>
                </View>
                <Field
                    icon={<CalendarIcon fill={'black'} width={30} height={30} />} label={'Birthday'}
                />
                <View orientation='row' transparent justifyContent='space-around'>
                    <Button title='Cancel' onPress={() => {
                        handleClose()
                    }} />
                    <Button title='Submit' onPress={() => {
                        console.log('yikes')
                        handleClose()
                    }} />
                </View>
            </View>
        </SafeAreaView>
    </Modal>
}

export default Application
