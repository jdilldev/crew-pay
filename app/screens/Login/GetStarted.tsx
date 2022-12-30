import React, { useEffect, useState } from "react"
import { Image, KeyboardAvoidingView, Platform } from "react-native"
import { View, Text, Button, PhoneValidationInput, EmailValidationInput, } from "../../styles/styles";
import {
    isValidPhoneNumber,
} from 'libphonenumber-js'
import ReceivingMessageSVG from '../../assets/svgs/receiving-message.svg'
import { LoginType, RootStackScreenProps } from "../../types";
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/Constants'
import { useStytchEmail, useStytchSMS } from "../../hooks/useStytch";
import { useStore } from '../../GlobalUserSettingsContext'
import { isValidEmail } from "../../utils";


const GetStarted = ({ navigation }: RootStackScreenProps<'GetStarted'>) => {
    const { countryCode, authType, setAuthType, userPhone, userEmail } = useStore()
    const requestPasscode = authType === LoginType.PHONE ? isValidPhoneNumber(userPhone, countryCode) : isValidEmail(userEmail)
    const { data, refetch, isSuccess, } = authType === LoginType.PHONE ? useStytchSMS(userPhone, false) : useStytchEmail(userEmail, false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (isSuccess) {
            const { error_message, error_type } = data
            if (error_message) {
                setError(error_message)
            } else {
                const { phone_id, email_id, user_id, status_code } = data
                //handle logic for registering user and auth when they verify passcode
                //handle token and

                navigation.navigate('AuthPasscode', { methodID: phone_id || email_id, userID: user_id })
            }
        }
    }, [isSuccess, data])


    return <KeyboardAvoidingView
        style={{ flex: 1, flexGrow: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <View
            flex={.6}
            backgroundColor='cornflowerblue'
            transform={[{ scale: 1.5 }, { translateY: 20 }]}
        >
            <ReceivingMessageSVG
                style={{
                    width: DEVICE_WIDTH,
                    height: DEVICE_HEIGHT / 3.5
                }} />
        </View>
        <View flex={1} padding={10}>
            <Text size="medium" fontWeight="bold">Choose login method</Text>
            <Text fontWeight="300" size='default' spacing={false}>We will send a one-time, 6-digit passcode to make sure it is really you.</Text>
            {error ?
                <Text type="error">{error}</Text> : null
            }
            <View
                spacing={true}
                alignSelf='center'
                borderWidth={0}
                paddingHorizontal={7}
                paddingVertical={3}
                borderRadius={0}
                borderColor='black'
                minHeight={40}
            >
                {authType === LoginType.EMAIL
                    ? <EmailValidationInput /> : <PhoneValidationInput />}
            </View>
            <View flexDirection="row" justifyContent="center">
                <Text
                    textAlign="center"
                    size="default"
                    onPress={() => {
                        authType === LoginType.EMAIL ? setAuthType(LoginType.PHONE) : setAuthType(LoginType.EMAIL)

                    }}>
                    Use {authType === LoginType.EMAIL ? 'phone' : 'email'}
                </Text>
                <View flexDirection="row" alignItems="center">
                    <Image style={{ width: 20, height: 20, marginLeft: 40 }} source={require('../../assets/images/vector/google.png')} />
                    <Text marginLeft={2}> Use Gmail</Text>
                </View>
            </View>
            <Text size="small" textAlign="center" paddingHorizontal={5}>By continuing, you may receive an SMS for verification. Message and data rates may apply. Must be in participating country.</Text>
            <Button
                style={{ alignSelf: 'center' }}
                type='primary'
                icon={{ name: 'send', pack: 'material' }}
                disabled={!requestPasscode}
                fullWidth
                text="Get passcode"
                onPress={() => {
                    refetch()
                }} />
        </View>

    </KeyboardAvoidingView >
}

export default GetStarted;