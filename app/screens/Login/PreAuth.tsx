import React, { useEffect } from "react"
import { Image, Pressable } from "react-native"
import LottieView from 'lottie-react-native';
import { View, Text, Button } from '../../styles/styles';
import { LoginType, RootStackScreenProps } from "../../types";
import { useStore } from '../../GlobalUserSettingsContext'

const Login = ({ navigation }: RootStackScreenProps<'Login'>) => {
    const { setAuthType, setUserEmail, setUserPhone } = useStore()

    return (
        <View flex={1} paddingHorizontal={20}>
            <View flex={1.5}>
                <LottieView
                    autoPlay
                    loop
                    source={require('../../assets/lotties/floating-moneybag.json')}
                />
            </View>
            <View flex={.3} justify='center' align="center" >
                <Text size='large' fontWeight="bold" spacing={false} marginTop={-80} >Oh you look <Text fontWeight="200" size="large" fontStyle="italic">good</Text> when you stack that <Text size="large" customColor="green">cash</Text> up.</Text>
                <Text
                    fontWeight="300"
                    textAlign="center">The modern way to spend money and split costs in a group.
                </Text>
            </View>
            <View flex={1} orientation='column' justify="space-evenly" paddingBottom={30} >
                <Button
                    type='primary'
                    shape='oval'
                    text='Continue with Phone'
                    fullWidth
                    icon={{
                        name: 'phone-portrait-outline', pack: 'ion', size: 25,
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
                    fullWidth
                    icon={{
                        name: 'email', pack: 'zocial', size: 25
                    }} onPress={() => {
                        setAuthType(LoginType.EMAIL)
                        setUserEmail('')
                        navigation.navigate('GetStarted')
                    }} />


                <View flex={.5}>
                    <View orientation="row" width={'100%'} alignItems='center' justifyContent="center" spacing={true}>
                        <View orientation="row" flex={.2} alignSelf="center" borderBottomWidth={1} borderBottomColor='black' />
                        <Text flex={1} numberOfLines={1} textAlign="center" spacing={false}> Or connect Google account  </Text>
                        <View orientation="row" flex={.2} alignSelf="center" borderBottomWidth={1} borderBottomColor='black' />
                    </View>
                    <Image
                        style={{ alignSelf: 'center', width: 25, height: 25, marginRight: 5, }}
                        source={require('../../assets/images/vector/google.png')} />
                </View>
            </View>
        </View >
    )
}

export default Login;