import React, { useContext, useEffect, useState } from 'react'
import { View, Text, Button } from '../../styles/styles'
import axios from 'axios'
import OTP from '../../assets/svgs/OTP-phone.svg'
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/Constants'
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import { LoginType, RootStackScreenProps } from '../../types'
import parsePhoneNumber from 'libphonenumber-js'
import { AuthenticateResponse } from 'stytch/types/lib/otps'
import { useStore } from '../../GlobalUserSettingsContext'
import { useAuthOTP } from '../../hooks/useStytch'

const AuthPasscode = ({ route, navigation }: RootStackScreenProps<'AuthPasscode'>) => {
    const { methodID } = route.params
    const [passcodeArray, setPasscode] = useState<string[]>([])
    const { countryCode, authType, userPhone, userEmail } = useStore()
    const { data, refetch, isSuccess, } = useAuthOTP(methodID, passcodeArray.join(''), !(passcodeArray.some(entry => entry === '') || passcodeArray.length !== 6))
    const [error, setError] = useState('')

    useEffect(() => {
        if (data) {
            const { status_code } = data
            if (status_code === 200)
                navigation.navigate('Dashboard')
            else {
                const { error_message } = data
                setError(error_message)
            }
        }
    }, [data])

    useEffect(() => {
        if (!(passcodeArray.some(entry => entry === '') || passcodeArray.length !== 6))
            refetch()
    }, [passcodeArray])


    return <KeyboardAvoidingView
        style={{ display: 'flex', flex: 1, flexDirection: 'column', marginTop: 30 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <View flex={1}>
            <OTP
                style={{
                    width: DEVICE_WIDTH,
                    height: DEVICE_HEIGHT / 2
                }} />
        </View>
        <View flex={1} >
            <View justify='center' align='center'>
                <Text spacing={false}>{'A six-digit code was sent to you at'}</Text>
                <Text>{authType === LoginType.PHONE ? parsePhoneNumber(userPhone, countryCode)?.formatInternational() : userEmail}</Text>
            </View>
            <View style={{ width: '90%', alignSelf: 'center' }} orientation='row' justify='space-between' spacing={true}>
                {Array(6).fill(-1).map((digit, idx) =>
                    <TextInput
                        key={idx}
                        maxLength={1}
                        keyboardType='numeric'
                        value={passcodeArray[idx]}
                        onKeyPress={({ nativeEvent }) => {
                            //check if key pressed is back space
                            //check array passcode is valid
                            //refetch
                            const tmpArr = [...passcodeArray]
                            tmpArr[idx] = (!isNaN(+nativeEvent.key)) ? nativeEvent.key : ''
                            setPasscode(tmpArr)

                            if (!(passcodeArray.some(entry => entry === '') || passcodeArray.length !== 6 || isNaN(+nativeEvent.key) || nativeEvent.key === 'Backspace')) {
                                setPasscode(tmpArr)
                            }
                        }}
                        style={{
                            textAlign: 'center',
                            fontSize: 30,
                            width: 50,
                            height: 50,
                            borderColor: 'black',
                            borderRadius: 5,
                            borderWidth: 1
                        }} />
                )}

            </View>
            {
                error ? <Text align='center' type='error'>{error}</Text> : null
            }
            <Text size='small' style={{ marginLeft: 5, }}>Didn't get a code? Click here to resend.</Text>

            {/* <Button
                disabled={passcodeArray.some(entry => entry === '') || passcodeArray.length !== 6}
                style={{ alignSelf: 'center' }}
                width='medium'
                text='Verify'
                onPress={() => {
                    refetch()
                }} /> */}
        </View>
    </KeyboardAvoidingView>
}

export default AuthPasscode