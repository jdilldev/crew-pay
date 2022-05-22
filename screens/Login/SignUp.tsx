import React, { useRef, useState } from "react"
import { Appearance, Dimensions, Image, KeyboardAvoidingView, Platform, TextInput, } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context";
import Colors from "../../constants/Colors";
import { View, Text, Icon, IconInput, ButtonGroup, Button, } from "../../styles/styles";
import { RootStackScreenProps, LoginType, useThemeColor } from "../../types";

//const imageUrl = { uri: require("../../../assets/images/birds-eye-food.jpg") }
const DEVICE_WIDTH = Dimensions.get('window').width;

const theme = Appearance.getColorScheme()

const SignUp = ({ navigation }: RootStackScreenProps<'SignUp'>) => {
    const [countryCode, setCountryCode] = useState('+1')

    return (
        <KeyboardAvoidingView
            style={{ flex: 2, backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
            {/*    <ImageBackground
                imageStyle={{ opacity: .4, }}
                style={{
                    flex: 1,
                }}
                source={require('../../assets/images/patterm.png')}
            > */}
            <Image
                style={{ flex: 1 }}
                source={require('../../assets/images/blue-fluid-waves.jpg')} />
            <View flex={.4} style={{ paddingHorizontal: 20 }}>
                <Text size="medium" thickness="bold">Enter your phone number</Text>
                <Text size='default'>We will send a one-time, 4 digit passcode to make sure it is really you.</Text>
            </View>
            <View align="center" style={{ flex: 1, }}>
                <Text align="center">Country</Text>
                <View orientation="row" spacing={true} style={{ borderWidth: 1, paddingVertical: 7, borderRadius: 30, borderColor: 'black', backgroundColor: 'lightgray' }}>
                    <TextInput style={{ paddingLeft: 10, fontSize: 20 }}>{countryCode}</TextInput>
                    <View orientation="row" style={{ borderRightColor: 'black', borderRightWidth: 1, height: 30, marginHorizontal: 5, }} />
                    <TextInput keyboardType="phone-pad" placeholder="Enter phone number" style={{ paddingRight: 20, minWidth: 200, fontSize: 20 }} >{ }</TextInput>
                </View>
                <Button type='primary' icon={{ icon: 'send', pack: 'material' }} width="full" text="Get passcode" onPress={() => { }} />
                <Text size="small">Use email isntead</Text>
            </View>
        </KeyboardAvoidingView >
    )
}

export default SignUp;