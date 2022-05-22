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
                    align="center">The modern way to spend money and split costs with friends.
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
                        navigation.navigate('SignUp')
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
                        navigation.navigate('SignUp')
                    }} />

                <View style={{ flex: .6 }} orientation="column" >
                    <Text align="center" spacing={false}>Or connect to Google account</Text>
                    <View justify="space-evenly" orientation="row" spacing={true} wrap>
                        <Text size="small" onPress={() => { }}>Link Gmail</Text>
                    </View>

                </View>
            </View>
        </View >
    )
}

export default Login;