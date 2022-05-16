import React, { useState } from "react"
import { View, Text, Image, Pressable, Button, ImageBackground } from "react-native"
import LottieView from 'lottie-react-native';
import styled from 'styled-components/native'
import GlobalStyles, { H1, IconInput, PrimaryButton, SecondaryButton } from '../../styles/styles';
import { loginType } from "../../constants/enums";
import { RootStackScreenProps } from "../../types";

const Login = ({ navigation }: RootStackScreenProps<'Login'>) => {
    const [phoneOrEmail, setLoginType] = useState<loginType>(loginType.PHONE)

    return (
        <View style={{ flex: 1, paddingHorizontal: 20, backgroundColor: 'white' }}>
            <View style={{ flex: .8, }}>
                <LottieView
                    autoPlay
                    loop
                    source={require('../../assets/lotties/woman-and-moneybag.json')}
                />
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', marginTop: -40 }}>
                {/*  <Image
                    style={{ width: 200, height: 200 }}
                    source={require('../assets/images/blue-stacks.jpg')} /> */}
                <Text style={GlobalStyles.h1}>Oh you look <Text style={{ fontStyle: 'italic', fontWeight: '200' }}>good</Text> when you stack that <Text style={{ color: 'green' }}>cash</Text> up.</Text>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: '200', textAlign: 'center', marginTop: 20 }}>The modern way to spend money and split costs with friends.</Text>
                    <PrimaryButton fullWidth onPress={() => {
                        navigation.navigate('NotFound')
                    }} />

                </View>
                <View style={{ flex: .7 }}>
                    <Text style={{ fontSize: 20, fontWeight: '300', textAlign: 'center', color: '#34658f' }}>Already have an account?</Text>
                    <SecondaryButton fullWidth onPress={() => { }} />
                </View>
                {/*  {phoneOrEmail === loginType.PHONE ?
                    <IconInput icon='keypad-outline' placeholder={'Enter phone number'} type={phoneOrEmail} />
                    : <IconInput icon='email' placeholder={'Enter email address'} type={phoneOrEmail} />
                } */}
                {/*   <Pressable
                    style={{ display: 'flex', alignItems: 'center' }}
                    onPress={() => { phoneOrEmail === loginType.PHONE ? setLoginType(loginType.EMAIL) : setLoginType(loginType.PHONE) }}>
                    <Text>
                        Use {phoneOrEmail === loginType.PHONE ? loginType.EMAIL : loginType.PHONE}
                    </Text>
                </Pressable>
                <Button title="Get one-time passcode"></Button> */}
                {/*          <LottieView
                    style={{ height: 150 }}
                    autoPlay
                    loop
                    source={require('../assets/lotties/howdy.json')}
                /> */}
            </View>
            <View style={{ flex: .2, alignItems: 'center', }}>
                <Text style={{ fontWeight: '200' }}>Country</Text>
            </View>
        </View >
    )
}

export default Login;