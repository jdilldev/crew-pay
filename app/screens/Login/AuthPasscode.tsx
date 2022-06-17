import React, { useEffect, useState } from 'react'
import { View, Text, } from '../../styles/styles'
import OTP from '../../assets/svgs/OTP-phone.svg'
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/Constants'
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import { LoginType, RootStackScreenProps } from '../../types'
import parsePhoneNumber from 'libphonenumber-js'
import { useStore } from '../../GlobalUserSettingsContext'
import { useAuthOTP } from '../../hooks/useStytch'
import { useApp } from '@realm/react'

const AuthPasscode = ({ route, navigation }: RootStackScreenProps<'AuthPasscode'>) => {
    const { methodID } = route.params
    const [code, setCode] = useState('')
    const [passcode, setPasscode] = useState<string[]>([])
    const { countryCode, authType, userPhone, userEmail } = useStore()
    const { data, refetch, isSuccess, } = useAuthOTP(methodID, code, !(passcode.length !== 6))
    const [error, setError] = useState('')

    //console.log(realm.objects('User'))
    const app = useApp();
    useEffect(() => {
        (async () => {
            if (data) {
                const { status_code } = data
                if (status_code === 200) {
                    const credentials = Realm.Credentials.anonymous()
                    try {
                        await app.logIn(credentials);

                    } catch (error) {
                        throw `Error logging in anonymously: ${JSON.stringify(error, null, 2)}`;
                    }
                }
                //  navigation.navigate('Dashboard')
                else {
                    const { error_message } = data
                    setError(error_message)
                }
            }
        })()
    }, [data])

    useEffect(() => {
        console.log('in effect ------- ' + code)
        if (code.length === 6)
            refetch()
    }, [code])

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
                <TextInput
                    maxLength={6}
                    keyboardType='numeric'
                    autoComplete='sms-otp' //android 
                    textContentType='oneTimeCode' //ios
                    value={code}
                    onChangeText={e => {
                        setPasscode(e.split(''))
                        setCode(e)
                    }}
                    style={{
                        display: 'none',

                    }} />
                {Array(6).fill(-1).map((digit, idx) =>
                    <TextInput
                        key={`passcode-input-${idx}`}
                        maxLength={1}
                        keyboardType='numeric'
                        value={code[idx]}
                        style={{
                            textAlign: 'center',
                            fontSize: 30,
                            width: 50,
                            height: 50,
                            borderColor: 'black',
                            borderRadius: 5,
                            borderWidth: 1
                        }}
                        onChangeText={e => {
                            if (!isNaN(+e)) {
                                console.log(e)
                                const tmpArr = [...passcode]
                                tmpArr[idx] = (!isNaN(+e)) ? e : ''
                                setPasscode(tmpArr)

                                if (!(tmpArr.some(item => item === '') || tmpArr.length !== 6 || isNaN(+e))) {
                                    setCode(tmpArr.join(''))
                                }
                            }
                        }}
                    />
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