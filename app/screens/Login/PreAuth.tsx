import React from "react"
import { Image, Pressable } from "react-native"
import LottieView from 'lottie-react-native';
import { View, Text, Button } from '../../styles/styles';
import { LoginType, RootStackScreenProps } from "../../types";
import { useStore } from '../../GlobalUserSettingsContext'

const Login = ({ navigation }: RootStackScreenProps<'Login'>) => {
    const { setAuthType, setUserEmail, setUserPhone } = useStore()

    return (
        <View flex={1} paddingHorizontal={20}>
            <View flex={2}>
                <LottieView
                    autoPlay
                    loop
                    source={require('../../assets/lotties/floating-moneybag.json')}
                />
            </View>
            <View flex={1} justify='center' align="center" >
                <Text size='large' fontWeight="bold" spacing={false} marginTop={-80}>Oh you look <Text fontWeight="200" size="large" fontStyle="italic">good</Text> when you stack that <Text size="large" customColor="green">cash</Text> up.</Text>
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

                <View flex={.6} orientation="column" justifyContent='center' alignItems="center">
                    <Pressable
                        onPress={() => { setAuthType(LoginType.GMAIL) }}
                    >
                        <Text textAlign="center" spacing={false}>Or connect to Google account</Text>
                        <Image
                            style={{ alignSelf: 'center', width: 20, height: 20, marginRight: 5, marginTop: 5 }}
                            source={require('../../assets/images/vector/google.png')} />
                    </Pressable>
                </View>
            </View>
        </View >
    )
}

export default Login;