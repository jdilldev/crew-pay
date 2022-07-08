import React, { useEffect, useState } from 'react'
import { View, Text, Vector, } from '../../styles/styles'
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/Constants'
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import { LoginType, RootStackScreenProps } from '../../types'
import parsePhoneNumber from 'libphonenumber-js'
import { storeDataAsyncStorage, useStore } from '../../GlobalUserSettingsContext'
import { useAuthOTP } from '../../hooks/useStytch'
import { useApp } from '@realm/react'

const AuthPasscode = ({ route, navigation }: RootStackScreenProps<'AuthPasscode'>) => {
    const { methodID, userID } = route.params
    const [code, setCode] = useState('')
    const [passcode, setPasscode] = useState<string[]>([])
    const { countryCode, authType, userPhone, userEmail } = useStore()
    //const { data, refetch, isSuccess, } = useAuthOTP(methodID, code, !(passcode.length !== 6))
    const [error, setError] = useState('')


    const app = useApp();
    const authenticate = async (authenticationCode: string) => {
        const credentials = Realm.Credentials.function({ method_id: methodID, code: authenticationCode, nationality: countryCode })
        //   storeDataAsyncStorage('token', session_token) TODO handle session
        try {
            const user = await app.logIn(credentials)
            const userCollection = user.mongoClient("mongodb-atlas").db("stackDB").collection("User");
            const filter = {
                _id: user.id, // Query for the user object of the logged in user
            };
            const updateDoc = {
                $set: {
                    phone: authType === LoginType.PHONE ? userPhone : undefined,
                    email: authType !== LoginType.PHONE ? userEmail : undefined,
                    nationality: countryCode,
                    verificationType: countryCode !== 'US' ? 'passport' : 'ssn'
                },
            };
            const result = await userCollection.updateOne(filter, updateDoc);
        } catch (error) {
            throw `Error logging in with custom function calling Stytch API: ${error}`;
        }
    }


    return <KeyboardAvoidingView
        style={{ display: 'flex', flex: 1, flexDirection: 'column', marginTop: 30 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
        <View flex={1}>
            <Vector name='one-time-password' width={'100%'} height={'100%'} />
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
                                const tmpArr = [...passcode]
                                tmpArr[idx] = (!isNaN(+e)) ? e : ''
                                setPasscode(tmpArr)

                                if (!(tmpArr.some(item => item === '') || tmpArr.length !== 6 || isNaN(+e))) {
                                    setCode(tmpArr.join(''))
                                    authenticate(tmpArr.join(''))
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