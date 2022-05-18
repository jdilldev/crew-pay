import React, { useState } from "react"
import { Pressable, } from "react-native"
import { View, Text, Icon, IconInput, PrimaryButton, } from "../../styles/styles";
import { RootStackScreenProps, LoginType } from "../../types";

const SignUp = ({ navigation }: RootStackScreenProps<'SignUp'>) => {
    const [phoneOrEmail, setLoginType] = useState<LoginType>(LoginType.PHONE)

    return (
        <View style={{ flex: 1, padding: 10 }}>
            <View style={{ flex: .5 }}>
            </View>
            <View style={{ flex: 1 }}>
                {/*     <Image
                    style={{ width: 200, height: 200 }}
                    source={require('../../assets/images/blue-stacks.jpg')} /> */}
                <Pressable
                    style={{ display: 'flex', alignItems: 'center' }}
                    onPress={() => { phoneOrEmail === LoginType.PHONE ? setLoginType(LoginType.EMAIL) : setLoginType(LoginType.PHONE) }}>
                    {phoneOrEmail === LoginType.PHONE ?
                        <Icon icon='keypad-outline' pack='ion' size='large' />
                        : <IconInput icon='email' pack='material' placeholder={'Enter email address'} type={phoneOrEmail} />
                    }
                </Pressable>
                <PrimaryButton midWidth onPress={() => { }} />

                <Pressable
                    style={{ display: 'flex', alignItems: 'center' }}
                    onPress={() => { phoneOrEmail === LoginType.PHONE ? setLoginType(LoginType.EMAIL) : setLoginType(LoginType.PHONE) }}>
                    <Text>
                        Use {phoneOrEmail === LoginType.PHONE ? LoginType.EMAIL : LoginType.PHONE}
                    </Text>
                </Pressable>
                {/*                <LottieView
                    style={{ height: 150 }}
                    autoPlay
                    loop
                    source={require('../../assets/lotties/howdy.json')}
                /> */}
            </View>
        </View >
    )
}

export default SignUp;