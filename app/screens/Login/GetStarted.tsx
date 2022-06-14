import React, { useEffect, useState } from "react"
import { Image, KeyboardAvoidingView, Platform } from "react-native"
import { View, Text, Button, PhoneValidationInput, EmailValidationInput, isValidEmail, } from "../../styles/styles";
import {
    AsYouType,
    isValidPhoneNumber,
} from 'libphonenumber-js'
import Logo from '../../assets/svgs/receiving-message.svg'
import { LoginType, RootStackScreenProps, ThemeProps } from "../../types";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/Constants'
import axios from 'axios'
import { SendOTPBySMSResponse, OTPEmailSendResponse } from "stytch/types/lib/otps";
import { useStytchEmail, useStytchSMS } from "../../hooks/useStytch";
import RealmContext, { User } from '../../database'
import { Realm, createRealmContext } from "@realm/react";
import { addUser } from "../../database/services/user";
import { useStore } from '../../GlobalUserSettingsContext'

const { useRealm, useQuery, useObject } = RealmContext

const GetStarted = ({ navigation }: RootStackScreenProps<'GetStarted'>) => {
    const realm: Realm = useRealm();
    const { countryCode, authType, setAuthType, userPhone, userEmail } = useStore()
    const requestPasscode = authType === LoginType.PHONE ? isValidPhoneNumber(userPhone, countryCode) : isValidEmail(userEmail)
    const { data, refetch, isSuccess, } = authType === LoginType.PHONE ? useStytchSMS(userPhone, false) : useStytchEmail(userEmail, false)
    const [error, setError] = useState('')

    useEffect(() => useStore.setState({ realm: realm }), [])
    /* 
        realm.write(() => {
            realm.delete(realm.objects("User"));
        });
     */


    // addUser({ _id: 'pour', nationality: 'UK' })

    /*     const t = useObject<User>('User', '3')
        if (t) {
            realm.write(() => {
                t.dob = 'january birthday'
            })
        } */

    //  console.log(realm.objects('User'))

    // console.log(useObject('User', '3'))

    useEffect(() => {
        if (isSuccess) {
            const { error_message, error_type } = data
            if (error_message) {
                setError(error_message)
            } else {
                const { phone_id, email_id, user_id, status_code } = data
                const user = realm.objectForPrimaryKey("User", user_id); // search for a realm object with a primary key that is an int.

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
                    }

                navigation.navigate('AuthPasscode', { methodID: phone_id || email_id })
            }
        }
    }, [isSuccess, data])


    return <KeyboardAvoidingView
        style={{ flex: 1, flexGrow: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View
            flex={.6}
            style={{
                backgroundColor: 'cornflowerblue',
                transform: [{ scale: 1.5 }, { translateY: 20 }]

            }}>
            <Logo
                style={{
                    width: DEVICE_WIDTH,
                    height: DEVICE_HEIGHT / 3.5
                }} />
        </View>
        <View flex={1} style={{ padding: 10 }}>
            <Text size="medium" thickness="bold">Choose login method</Text>
            <Text size='default' spacing={false}>We will send a one-time, 4-digit passcode to make sure it is really you.</Text>
            {error ?
                <Text type="error">{error}</Text> : null
            }
            <View
                //justify="center"
                spacing={true}
                style={{
                    alignSelf: 'center',
                    borderWidth: 0,
                    paddingHorizontal: 7,
                    paddingVertical: 3,
                    borderRadius: 0,
                    borderColor: 'black',
                    //                    backgroundColor: '#e0e0e07e',
                    minHeight: 40,
                }}>
                {authType === LoginType.EMAIL
                    ? <EmailValidationInput /> : <PhoneValidationInput />}
            </View>
            <View orientation="row" justify="center">
                <Text
                    align="center"
                    size="default"
                    type="secondary"
                    onPress={() => {
                        authType === LoginType.EMAIL ? setAuthType(LoginType.PHONE) : setAuthType(LoginType.EMAIL)

                    }}>
                    Use {authType === LoginType.EMAIL ? 'phone' : 'email'}
                </Text>
                <View orientation="row" align="center">
                    <Text style={{ marginLeft: 20, }}> Use Gmail</Text>
                    <Image style={{ width: 20, height: 20, }} source={require('../../assets/images/vector/gmail-logo.jpg')} />
                </View>
            </View>
            <Text size="small" align="center" style={{ paddingHorizontal: 5 }}>By continuing, you may receive an SMS for verification. Message and data rates may apply. Must be in participating country.</Text>
            <Button
                style={{ alignSelf: 'center' }}
                type='primary'
                icon={{ icon: 'send', pack: 'material' }}
                disabled={!requestPasscode}
                width="full" text="Get passcode"
                onPress={() => {
                    refetch()
                }} />
        </View>

    </KeyboardAvoidingView >
}

export default GetStarted;