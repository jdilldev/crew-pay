import { useUser } from '@realm/react';
import React, { useEffect } from 'react'
import { View } from '../../styles/styles'
import RealmContext, { Group, User } from '../../database'
const { useRealm, useQuery, useObject } = RealmContext

const FundsScreen = () => {
    const user = useUser();
    const realm = useRealm()

    console.log(realm.objects('User'))




    console.log(user?.id)
    console.log(user?.profile)


    return <View flex={1}></View>
}

export default FundsScreen
