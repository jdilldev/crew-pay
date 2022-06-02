import React from 'react'
import { View, Text, Button } from '../../styles/styles'
import OTP from '../../assets/svgs/OTP-phone.svg'
import { DEVICE_WIDTH, DEVICE_HEIGHT } from '../../constants/Constants'
import { KeyboardAvoidingView, Platform, TextInput } from 'react-native'

const AuthPasscode = () => {

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
            <Text align='center'>{'A six-digit code was sent to you at\n(410)-258-0552'}</Text>
            <View style={{ width: '90%', alignSelf: 'center' }} orientation='row' justify='space-between'>
                {Array(6).fill(0).map((digit, idx) =>
                    <TextInput key={idx} maxLength={1} keyboardType='numeric' style={{ textAlign: 'center', fontSize: 30, width: 50, height: 50, borderColor: 'black', borderRadius: 5, borderWidth: 1 }} />
                )}
            </View>
            <Text size='small' style={{ marginLeft: 5, }}>Didn't get a code? Click here to resend.</Text>
            <Button style={{ alignSelf: 'center' }} width='medium' text='Verify' onPress={() => { }} />
        </View>
    </KeyboardAvoidingView>
}

export default AuthPasscode