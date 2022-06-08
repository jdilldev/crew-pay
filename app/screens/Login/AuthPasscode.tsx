import React, { useContext, useState } from 'react'
import { View, Text, Button } from '../../styles/styles'
import OTP from '../../assets/svgs/OTP-phone.svg'
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/Constants'
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import parsePhoneNumber from 'libphonenumber-js'
import { LoginType, RootStackScreenProps } from '../../types'
import axios, { AxiosError } from 'axios'
import { ColorContext } from '../../GlobalUserSettingsContext'


const AuthPasscode = ({ route }: RootStackScreenProps<'AuthPasscode'>) => {
    const { userContact, methodID } = route.params
    const [passcodeArray, setPasscode] = useState<string[]>([])
    const [error, setError] = useState('')
    const { countryCode, authType, } = useContext(ColorContext)

    let phoneNumber = undefined
    if (authType === LoginType.PHONE)
        phoneNumber = parsePhoneNumber(userContact, countryCode)

    console.log(countryCode)
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
            <View justify='center' align='center' >
                <Text spacing={false}>{`A six-digit code was sent to you at`}</Text>
                <Text style={{ color: 'brown' }}>{authType === LoginType.PHONE ? phoneNumber?.formatInternational() : userContact}</Text>
            </View>
            <View style={{ width: '90%', alignSelf: 'center' }} orientation='row' justify='space-between'>
                {Array(6).fill(0).map((digit, idx) =>
                    <TextInput
                        key={idx}
                        maxLength={1}
                        keyboardType='numeric'
                        value={passcodeArray[idx]}
                        onChangeText={e => {
                            if (!isNaN(+e)) {
                                const tmpArr = [...passcodeArray]

                                tmpArr[idx] = e
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
            <Text size='small' style={{ marginLeft: 5, }}>Didn't get a code? Click here to resend.</Text>
            <Button
                disabled={passcodeArray.some(entry => entry === '')}
                style={{
                    alignSelf: 'center'
                }}
                width='medium'
                text='Verify'
                onPress={
                    async () => {
                        try {
                            const passcode = passcodeArray.join('')
                            const { user_id, status_code, error_type } = await (await axios.get('http://127.0.0.1:8000/verify-code/', { params: { methodID, passcode } })).data

                            console.log(status_code)
                        } catch (err) {
                            if (axios.isAxiosError(err)) {
                                console.log(err.toJSON())
                            } else {
                                console.log(error)

                            }
                        }

                    }} />
        </View>
        {error !== '' &&
            <Text>Incorrrect code provided</Text>
        }
    </KeyboardAvoidingView>
}

export default AuthPasscode

/*Object {
"method_id": "phone-number-test-98cfbe19-6c8f-4b8b-b62a-e78a5a7bdff3",
"request_id": "request-id-test-562d675b-6802-4211-b8f6-41dfd0877303",
"session": null,
"session_jwt": "",
"session_token": "",
"status_code": 200,
"user": Object {
"created_at": null,
"crypto_wallets": Array [],
"emails": Array [
Object {
"email": "sandbox@stytch.com",
"email_id": "email-test-23873e89-d4ed-4e92-b3b9-e5c7198fa286",
"verified": false,
},
],
"name": null,
"password": null,
"phone_numbers": Array [
Object {
"phone_id": "phone-number-test-98cfbe19-6c8f-4b8b-b62a-e78a5a7bdff3",
"phone_number": "+10000000000",
"verified": false,
},
],
"providers": Array [],
"status": "",
"totps": Array [],
"user_id": "user-test-e3795c81-f849-4167-bfda-e4a6e9c280fd",
"webauthn_registrations": Array [],
},
"user_id": "user-test-e3795c81-f849-4167-bfda-e4a6e9c280fd",
} */