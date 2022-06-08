import React, { createContext, useContext } from "react"
import { Platform, Image, Pressable } from "react-native"
import LottieView from 'lottie-react-native';
import { View, Text, Button } from '../../styles/styles';
import { LoginType, RootStackScreenProps } from "../../types";
import { ColorContext } from "../../GlobalUserSettingsContext";


const Login = ({ navigation }: RootStackScreenProps<'Login'>) => {
    const { setAuthType, setUserEmail, setUserPhone } = useContext(ColorContext)

    return (
        <View flex={1} style={{ paddingHorizontal: 20 }}>
            <View flex={2}>
                <LottieView
                    autoPlay
                    loop
                    source={require('../../assets/lotties/floating-moneybag.json')}
                />
            </View>
            <View flex={1} justify='center' align="center" >
                <Text size='large' thickness="bold" spacing={false} style={{ marginTop: -80, }}>Oh you look <Text thickness="ultralight" size="large" style={{ fontStyle: 'italic' }}>good</Text> when you stack that <Text size="large" customColor="green">cash</Text> up.</Text>
                <Text
                    align="center">The modern way to spend money and split costs in a group.
                </Text>
            </View>
            <View flex={1} orientation='column' justify="space-evenly" style={{ paddingBottom: 30 }}>
                <Button
                    type='primary'
                    shape='oval'
                    text='Continue with Phone'
                    width='full'
                    icon={{
                        icon: 'phone-portrait-outline', pack: 'ion'
                    }}
                    onPress={() => {
                        setAuthType(LoginType.PHONE)
                        setUserPhone('')
                        navigation.navigate('GetStarted')
                    }} />
                <Button
                    type='primary'
                    outlined
                    shape='oval'
                    text='Continue with Email'
                    width='full'
                    icon={{
                        icon: 'email', pack: 'zocial'
                    }} onPress={() => {
                        setAuthType(LoginType.EMAIL)
                        setUserEmail('')
                        navigation.navigate('GetStarted')
                    }} />

                <View style={{ flex: .6 }} orientation="column" >
                    <Text align="center" spacing={false}>Or connect to Google account</Text>
                    <Pressable
                        onPress={() => { setAuthType(LoginType.GMAIL) }}
                    >
                        <View justify="center" orientation="row" spacing={true} wrap>
                            <Image
                                style={{ width: 30, height: 30 }}
                                source={require('../../assets/images/vector/gmail-logo.jpg')} />
                            <Text size="small">Link Gmail</Text>
                        </View>
                    </Pressable>
                </View>
            </View>
        </View >
    )
}

export default Login;