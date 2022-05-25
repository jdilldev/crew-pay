import React, { useState } from "react"
import LottieView from 'lottie-react-native';
import GlobalStyles, { Button, Text, View } from '../styles/styles';
import { LoginType } from "../types";
export const Login = () => {
    const [phoneOrEmail, setLoginType] = useState<LoginType>(LoginType.PHONE)

    return (
        <View style={{ flex: 1, paddingHorizontal: 20 }}>
            <View style={{ flex: 1, marginTop: 80 }}>
                <LottieView
                    autoPlay
                    loop
                    source={require('../assets/lotties/woman-and-moneybag.json')}
                />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -80 }}>
                {/*  <Image
                    style={{ width: 200, height: 200 }}
                    source={require('../assets/images/blue-stacks.jpg')} /> */}
                <Text style={GlobalStyles.h1}>Oh you look good when you stack that cash up.</Text>
                <View style={{ flex: 1, margin: 10 }}>
                    <Text style={{ fontSize: 20, fontWeight: '200', textAlign: 'center', marginTop: 20 }}>The modern way to spend money and split costs with friends.</Text>
                    <Button text='Login' width='full' onPress={() => { }} />
                    <Text style={{ fontSize: 20, fontWeight: '300', marginTop: 40, textAlign: 'center', color: '#34658f' }}>Already have an account?</Text>
                    <Button text="Sign Up" width="full" onPress={() => { }} />
                </View>

            </View>
            <View flex={.2}>
                <Text thickness="light">Country</Text>
            </View>
        </View >
    )
}