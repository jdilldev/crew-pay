import { useUser } from '@realm/react';
import React, { useEffect } from 'react'
import { Text, View } from '../../styles/styles'
import RealmContext, { Group, User } from '../../database'
import { useAuthenticatedStore } from '../../GlobalUserSettingsContext';
const { useRealm, useQuery, useObject } = RealmContext
import StopImage from '../../assets/svgs/stop.svg'

const FundsScreen = () => {
    const { currentUserID } = useAuthenticatedStore()
    const currentUser = currentUserID ? useObject(User, currentUserID) : null


    return <View flex={1} justifyContent='center'>
        <StopImage
            style={{
                width: '100%',
                height: '50%'
            }} />
        {currentUser?.applicationID ? <></> : <Text padding={10} fontWeight='200'>Sorry fren. You need to fill out some information about yourself before you can link bank accounts. For security reasons! </Text>}
    </View>
}

export default FundsScreen
