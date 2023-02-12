import React, { ReactNode, useCallback, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import { ButtonGroup, Vector, Text, View, Button } from '../../../styles/styles'
import { SectionList, Image, Switch, Pressable, } from 'react-native'
import { IconPacks, IconTypes } from '../../../types';
import Application from './Application';
import { ApplicationStatus } from "@unit-finance/unit-node-sdk";
import { useThemeColor } from '../../../components/Themed';
import RealmContext, { User } from '../../../database';
const { useObject } = RealmContext
import { useAuthenticatedStore } from '../../../GlobalUserSettingsContext';
import { useGetApplicationByID } from '../../../hooks/useUnit';
import { useUser } from '@realm/react';
import { APPLICATION_STATUS } from '../../../constants/Constants';

type CommonProps = {
    icon: IconTypes,
    pack: IconPacks,
    name: string,
    subText?: string
}

type AdditionalItemProps =
    | { toggle: boolean, component?: never }
    | { toggle?: never, component: ReactNode }

type ItemProps = CommonProps & AdditionalItemProps

type SectionProps = {
    title: string,
    data: ItemProps[],

}

type ProfileProps = SectionProps

const DATA: ProfileProps[] = [
    {
        title: "Profile",
        data: [{ icon: 'person-outline', pack: 'ion', name: 'Account', component: <Text>Hi</Text> }]
    },
    {
        title: "Verification",
        data: [{ icon: 'checkmark-done-outline', pack: 'ion', name: 'Identity', component: <Text>Verify</Text> }, { icon: 'md-document-text-outline', pack: 'ion', name: 'Documents', component: <Text>Testify</Text> }]
    },
    {
        title: "Notifications",
        data: [{ icon: 'ios-card-outline', pack: 'ion', name: 'Transactions', toggle: true, subText: 'These will always be visible in your activity feed' }, { icon: 'people', pack: 'simple', name: 'Group Changes', toggle: true, subText: 'When a new person joins or leaves' }]
    },
    {
        title: "Authentication Method",
        data: [{ icon: 'ios-card-outline', pack: 'ion', name: 'Authentication Method', toggle: true }]
    },
    {
        title: "Questions",
        data: [{ icon: 'ios-card-outline', pack: 'ion', name: 'Contact Support', component: <Text>Idolize</Text> }]
    },
];


const Item = ({ icon, name, pack, toggle, component, subText }: ItemProps) => {
    const [expand, setExpand] = useState(false)
    const color = useThemeColor({}, 'primary')

    return (
        name === 'Authentication Method' ? <ButtonGroup buttons={['FaceID', 'SMS Code']} updateValue={() => null} /> :
            <View flexDirection='column' >
                <View flexDirection='row' paddingVertical={10} alignItems='center'>
                    <Vector color={color} name={icon} pack={pack} />
                    <View marginLeft={20}>
                        <Text size='default' fontWeight='300'>{name}</Text>
                        {subText && <Text size='small' type='secondary'>{subText}</Text>}
                    </View>
                    <View position='absolute' right={20}>
                        {toggle === true ? <Switch /> : <Vector color='gray' pressable onPress={() => setExpand(!expand)} size={15} name={expand ? 'arrow-up' : 'arrow-down'} pack='simple' />}
                    </View>
                </View>
                {expand && component}
            </View>
    )
};



const ProfileDetails = () => {
    const { currentUserID } = useAuthenticatedStore()
    const user = useUser()
    const currentUser = currentUserID ? useObject(User, currentUserID) : null
    const applicationID = currentUser ? currentUser.applicationID : null
    const [openModal, setOpenModal] = useState(!applicationID)
    const { data, isLoading } = useGetApplicationByID(applicationID || '')
    const [status, setStatus] = useState<ApplicationStatus | 'Uninitiated' | 'Loading'>(data ? data : 'Loading')
    const country = currentUser ? currentUser.nationality : 'US'

    const color = useThemeColor({}, APPLICATION_STATUS[status].type!)

    console.log(currentUser?.customerID)
    useFocusEffect(
        useCallback(() => {
            setOpenModal(!applicationID);
            !isLoading ? setStatus(data) : 'Loading'
        }, [data])
    );
    return currentUser ? <View flex={1} >
        <View alignItems='center' justifyContent='center' spacing={true}>
            <View marginTop={5} width={100} height={100} borderRadius={30} overflow='hidden'>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={{ uri: `https://www.firstbenefits.org/wp-content/uploads/2017/10/placeholder.png` }} />
            </View>
            <Text fontSize={30} textTransform='capitalize' fontWeight='300' spacing={false}>{currentUser.firstName ? currentUser.firstName : 'Hello!'}</Text>
            <Pressable onPress={() => {
                if (APPLICATION_STATUS[status].text !== 'Approved') {
                    setOpenModal(true)
                }
            }}>
                <View flexDirection='row' alignItems='center'>
                    <Vector style={{ marginRight: 3 }} width={15} height={15} type={APPLICATION_STATUS[status].type} name={APPLICATION_STATUS[status].icon} color={color} />
                    <Text fontSize={20} type={APPLICATION_STATUS[status].type} fontWeight='normal'>{APPLICATION_STATUS[status].text}</Text>
                    {status === 'Loading' ? <LottieView
                        style={{ width: 100, }}
                        autoPlay
                        loop
                        source={require('../../../assets/lotties/loading-dots.json')}
                    /> : null}
                </View>
            </Pressable>
        </View>
        <SectionList
            contentContainerStyle={{ paddingHorizontal: 15 }}
            sections={DATA}
            keyExtractor={({ name, }, index) => name + index}
            renderItem={({ item: { icon, pack, name, toggle, component, subText }, index }: { item: ItemProps, index: number }) =>
                toggle ?
                    <Item icon={icon} pack={pack} name={name} toggle={toggle} subText={subText} />
                    : <Item icon={icon} pack={pack} name={name} component={component} subText={subText} />}
            renderSectionHeader={({ section: { title } }) => (
                <Text size='small' fontWeight='bold' textTransform='uppercase'>{title}</Text>
            )}
            ListFooterComponent={() =>
                <View style={{ padding: 10, }}>
                    <Button outlined fullWidth style={{ marginBottom: 10, alignSelf: 'center' }} size='smallButton' shape='rounded' text='Sign Out' onPress={() => user?.logOut()} />
                    <Button fullWidth outlined style={{ marginBottom: 10, alignSelf: 'center' }} type='error' size='smallButton' shape='rounded' text='Delete Account' onPress={() => user?.logOut} />
                    <Button fullWidth style={{ alignSelf: 'center' }} type='error' size='smallButton' shape='rounded' text='Wipe Account (GDPR Compliant)' onPress={() => user?.logOut} />
                </View>}
        />
        <Application region={country} openFromProfile={openModal} setOpenFromProfile={setOpenModal} status={status} updateStatus={setStatus} />

    </View >
        : <Text>No data</Text>
}

export default ProfileDetails

