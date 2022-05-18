import React, { useState } from "react"
import { NativeModules, Platform } from "react-native"
import LottieView from 'lottie-react-native';
import GlobalStyles, { View, Text, Button } from '../../styles/styles';
import { RootStackScreenProps } from "../../types";
const platform = Platform.OS

const geoInfo = platform === 'ios' ? NativeModules.SettingsManager.settings.AppleLocale ||
    NativeModules.SettingsManager.settings.AppleLanguages[0] : NativeModules.I18nManager.localeIdentifier

const [language, countryISO] = geoInfo.split('_')

const Login = ({ navigation }: RootStackScreenProps<'Login'>) => {
    return (
        <View flex={1} style={{ paddingHorizontal: 20, }}>
            <View flex={1.5}>
                <LottieView
                    autoPlay
                    loop
                    source={require('../../assets/lotties/woman-and-moneybag.json')}
                />
            </View>
            <View flex={1.1} justify='center' align="center" style={{ marginTop: -60 }}>
                {/*  <Image
                    style={{ width: 200, height: 200 }}
                    source={require('../assets/images/blue-stacks.jpg')} /> */}
                <Text size='large' thickness="bold" spacing={false}>Oh you look <Text thickness="ultralight" size="large" style={{ fontStyle: 'italic' }}>good</Text> when you stack that <Text size="large" customColor="green">cash</Text> up.</Text>
                <View flex={1}>
                    <Text align="center">The modern way to spend money and split costs with friends.</Text>
                    <Button type='primary' shape='oval' text='Sign Up' width='full' onPress={() => {
                        navigation.navigate('SignUp')
                    }} />
                </View>
            </View>
            <View flex={.3}>
                <Text type="primary" size='default' thickness='normal' align='center' >Already have an account?</Text>
                <Button shape='oval' type='default' outlined text={'Log In'} width='medium' onPress={() => { }} />
            </View>
            <View flex={.3} align='center' justify='center'>
                <Text size='small' thickness="light">{'Country '}</Text>
                <Text>{countryISO}</Text>
            </View>
        </View >
    )
}

export default Login;