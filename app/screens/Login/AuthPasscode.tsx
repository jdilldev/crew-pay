import React, { useContext, useState } from 'react'
import { View, Text, Button } from '../../styles/styles'
import axios from 'axios'
import OTP from '../../assets/svgs/OTP-phone.svg'
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/Constants'
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import { LoginType, RootStackScreenProps } from '../../types'
import { ColorContext } from '../../GlobalUserSettingsContext'
import parsePhoneNumber from 'libphonenumber-js'

const AuthPasscode = ({ route }: RootStackScreenProps<'AuthPasscode'>) => {
    const { methodID } = route.params
    const [passcodeArray, setPasscode] = useState<string[]>([])
    const { countryCode, authType, userPhone, userEmail } = useContext(ColorContext)

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
                style={{ alignSelf: 'center' }}
                width='medium'
                text='Verify'
                onPress={async () => {
                    const passcode = passcodeArray.join('')
                    const resp = (await axios.get('http://localhost:3333/verify-code/', { params: { methodID, passcode } })).data

                    console.log(resp)


                }} />
        </View>
    </KeyboardAvoidingView>
}

export default AuthPasscode