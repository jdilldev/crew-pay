import React, { useState } from "react"
import { Image, Pressable, Button, ImageBackground } from "react-native"
import LottieView from 'lottie-react-native';
import GlobalStyles, { Text, View, PrimaryButton, SecondaryButton } from '../styles/styles';
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
                    <PrimaryButton fullWidth onPress={() => {

                    }} />
                    <Text style={{ fontSize: 20, fontWeight: '300', marginTop: 40, textAlign: 'center', color: '#34658f' }}>Already have an account?</Text>
                    <SecondaryButton fullWidth onPress={() => { }} />
                </View>

            </View>
            <View style={{ flex: .2, alignItems: 'center', }}>
                <Text style={{ fontWeight: '200' }}>Country</Text>
            </View>
        </View >
    )
}