import React, { useContext, useState } from "react"
import { Image, KeyboardAvoidingView, Platform } from "react-native"
import { View, Text, Button, PhoneValidationInput, EmailValidationInput, isValidEmail, } from "../../styles/styles";
import {
    AsYouType,
    isValidPhoneNumber,

} from 'libphonenumber-js'
import Logo from '../../assets/svgs/receiving-message.svg'
import { LoginType, RootStackScreenProps, ThemeProps } from "../../types";
import { ColorContext } from "../../GlobalUserSettingsContext";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/Constants'
import axios from 'axios'
import { SendOTPBySMSResponse, OTPEmailSendResponse } from "stytch/types/lib/otps";
import { useStytchSMS } from "../../hooks/useStytch";

interface IProps {
    theme: ThemeProps
    navigation: RootStackScreenProps<'GetStarted'>
}


const GetStarted = ({ navigation }: RootStackScreenProps<'GetStarted'>) => {
    const [emailInput, setEmailInput] = useState('')
    const { countryCode, authType, setAuthType, userPhone, setUserPhone, setUserEmail } = useContext(ColorContext)
    const phoneFormatter: AsYouType = new AsYouType(countryCode)

    const { data, isLoading, isSuccess, status } = useStytchSMS('scer');

    console.log(data)
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
                    ? <EmailValidationInput previousValue={emailInput} updateInput={(val: string) => setEmailInput(val.toLowerCase())} /> : <PhoneValidationInput previousValue={userPhone} updateInput={(val: string) => setUserPhone(val)} />}
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
                disabled={authType === LoginType.PHONE ? !isValidPhoneNumber(userPhone, countryCode) : !isValidEmail(emailInput)}
                width="full" text="Get passcode"
                onPress={async () => {
                    const userContact = authType === LoginType.PHONE ? userPhone : emailInput
                    const params = { userContact, authenticationMedium: LoginType[authType] }
                    const { phone_id, email_id, user_id }: SendOTPBySMSResponse & OTPEmailSendResponse = (await axios.get('http://localhost:3333/preauth/', { params })).data

                    navigation.navigate('AuthPasscode', { methodID: phone_id || email_id })
                }} />
        </View>
    </KeyboardAvoidingView >
}

export default GetStarted;