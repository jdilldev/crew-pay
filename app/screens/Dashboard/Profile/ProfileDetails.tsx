import React, { ReactNode, useState } from 'react'
import { ButtonGroup, Icon, Text, View } from '../../../styles/styles'
import { SectionList, Image, Switch, Modal, SafeAreaView } from 'react-native'
import { IconPacks, IconTypes } from '../../../types';
import Application from './Application';

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
        title: "Security",
        data: [{ icon: 'ios-card-outline', pack: 'ion', name: 'Authentication Method', toggle: true }]
    },
    {
        title: "Questions",
        data: [{ icon: 'ios-card-outline', pack: 'ion', name: 'Contact Support', component: <Text>Idolize</Text> }]
    }

];

const Item = ({ icon, name, pack, toggle, component, subText }: ItemProps) => {
    const [expand, setExpand] = useState(false)

    return (
        name === 'Authentication Method' ? <ButtonGroup buttons={['FaceID', 'SMS Code']} /> :
            <View orientation='column' >
                <View orientation='row' paddingVertical={10} alignItems='flex-start'>
                    <Icon color='teal' icon={icon} pack={pack} />
                    <View marginLeft={20}>
                        <Text size='default' fontWeight='normal'>{name}</Text>
                        {subText && <Text size='small' type='secondary'>{subText}</Text>}
                    </View>
                    <View position='absolute' right={20}>
                        {toggle === true ? <Switch /> : <Icon color='gray' pressable onPress={() => setExpand(!expand)} size='medium' icon={expand ? 'arrow-up' : 'arrow-down'} pack='simple' />}
                    </View>
                </View>
                {expand && component}
            </View>
    )
};


const ProfileDetails = () => {
    const [openModal, setOpenModal] = useState(false)
    return <View flex={1} >
        <View align='center' justify='center' spacing={true}>
            <View marginTop={5} width={150} height={150} borderRadius={30} overflow='hidden'>
                <Image
                    style={{ width: '100%', height: '100%' }}
                    source={require('../../../assets/images/real/cool-friends-sunset.jpg')} />
            </View>
            <Text fontSize={30} textTransform='capitalize'>Name</Text>
            <Text onPress={() => setOpenModal(true)}>Status</Text>
        </View>

        <SectionList
            style={{ marginLeft: 20 }}
            sections={DATA}
            keyExtractor={({ name, }, index) => name + index}
            renderItem={({ item: { icon, pack, name, toggle, component, subText }, index }: { item: ItemProps, index: number }) =>
                toggle ?
                    <Item icon={icon} pack={pack} name={name} toggle={toggle} subText={subText} />
                    : <Item icon={icon} pack={pack} name={name} component={component} subText={subText} />}
            renderSectionHeader={({ section: { title } }) => (
                <Text size='small' fontWeight='bold' textTransform='uppercase'>{title}</Text>
            )}
        />
        <Application openFromProfile={openModal} setOpenFromProfile={setOpenModal} />
    </View>
}

export default ProfileDetails
