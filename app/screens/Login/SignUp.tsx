import React, { useState } from "react"
import { Dimensions, FlatList, Image, KeyboardAvoidingView, Modal, Platform, Pressable, TextInput, } from "react-native"
import useColorScheme from "../../hooks/useColorScheme";
import { View, Text, Button, } from "../../styles/styles";
import {
    parsePhoneNumber,
    AsYouType,
    getCountryCallingCode,
    isSupportedCountry,
    isValidNumberForRegion,
    CountryCallingCode,
    isValidPhoneNumber,
} from 'libphonenumber-js'
import Logo from '../../assets/svgs/receiving-message.svg'
import { LoginType, RootStackScreenProps, ThemeProps } from "../../types";
import type { CountryCode } from "libphonenumber-js";

const DEVICE_WIDTH = Dimensions.get('window').width;
const DEVICE_HEIGHT = Dimensions.get('window').height;

interface IProps {
    theme: ThemeProps
    navigation: RootStackScreenProps<'SignUp'>
}


const SignUp = ({ navigation }: IProps) => {
    const [pressing, setPressing] = useState('')
    const [phoneOrEmail, setLoginType] = useState<LoginType>(LoginType.PHONE)
    const [countrySearch, setCountrySearch] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [countryCode, setCountryCode] = useState<CountryCode>('US')
    const [countryCallingCode, setCountryCallingCode] = useState<CountryCallingCode>('1')
    const [phoneNumberInput, setPhoneNumberInput] = useState('')
    const phoneFormatter: AsYouType = new AsYouType(countryCode)

    const DATA = [
        {
            id: 'US',
            title: 'United States',
            image: require('../../assets/flags/us.png')
        },
        {
            id: 'GB',
            title: 'United Kingdom',
            image: require('../../assets/flags/gb.png')

        },
        {
            id: 'CA',
            title: 'Canada',
            image: require('../../assets/flags/ca.png')
        },
        {
            id: 'AU',
            title: 'Australia',
            image: require('../../assets/flags/au.png')
        },
    ].sort((a, b) => a.title.localeCompare(b.title));

    const handlePhoneNumberChange = (newNumber: string) => {
        if (isValidPhoneNumber(newNumber, countryCode)) {
            phoneFormatter.input(newNumber)

            const formattedNumber =
                phoneFormatter
                    .getNumber()!
                    .formatInternational()
                    .replace(`+${countryCallingCode} `, '');


            setPhoneNumberInput(formattedNumber)
        } else {
            setPhoneNumberInput(newNumber)

        }
    }

    const handleCountryChange = (newCountry: string) => {
        const newCountryAsCountryCode = newCountry.toUpperCase() as CountryCode
        if (isSupportedCountry(newCountryAsCountryCode)) {
            setPressing('')
            setCountryCode(newCountryAsCountryCode)
            setCountryCallingCode(getCountryCallingCode(newCountryAsCountryCode))
        }
    }
    return <View flex={1}>
        <KeyboardAvoidingView
            style={{ flex: 1, flexGrow: 1 }}
            behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View
                flex={.6}
                style={{
                    backgroundColor: 'cornflowerblue',
                    transform: [{ scale: 1.5 }, { translateY: 20 }]

                }}>
                <Logo
                    style={{
                        width: DEVICE_WIDTH,
                        height: DEVICE_HEIGHT / 3.5
                    }} />
            </View>
            <View flex={1} style={{ padding: 10 }}>
                <Text size="medium" thickness="bold">Choose login method</Text>
                <Text size='default' spacing={false}>We will send a one-time, 4-digit passcode to make sure it is really you.</Text>
                <View
                    orientation="row"
                    align="center" justify="flex-start"
                    spacing={true}
                    style={{
                        alignSelf: 'center',
                        borderWidth: 0,
                        paddingLeft: 7,
                        paddingVertical: 7,
                        borderRadius: 0,
                        borderColor: 'black',
                        backgroundColor: '#e0e0e07e',
                        width: '85%'
                    }}>
                    <Pressable
                        onPress={() => { setModalVisible(true) }}
                    >
                        <Image
                            style={{ width: 40, height: 25 }}
                            source={{ uri: `https://countryflagsapi.com/png/${countryCode}` }} />
                    </Pressable>
                    {
                        phoneOrEmail === LoginType.PHONE ? <Text
                            style={{ fontSize: 20, paddingLeft: 7 }}>
                            {`+ ${countryCallingCode}`}
                        </Text>
                            : null
                    }
                    <View orientation="row" style={{ borderRightColor: 'black', borderRightWidth: 1, height: 30, marginHorizontal: 5, }} />
                    <TextInput
                        textAlign="center"
                        keyboardType="phone-pad"
                        placeholder={phoneOrEmail === LoginType.PHONE ? "Enter phone number" : 'Enter email address'}
                        style={{ paddingRight: 0, minWidth: 160, fontSize: 20, }}
                        onChangeText={handlePhoneNumberChange} >
                        {phoneNumberInput}
                    </TextInput>
                </View>
                <View orientation="row" justify="center">
                    <Text align="center" size="default" type="secondary" onPress={() => { phoneOrEmail === LoginType.EMAIL ? setLoginType(LoginType.PHONE) : setLoginType(LoginType.EMAIL) }}>Use {phoneOrEmail === LoginType.EMAIL ? 'phone' : 'email'} instead</Text>
                    <View orientation="row" align="center">
                        <Text style={{ marginLeft: 20 }}>use Gmail</Text>
                        <Image style={{ width: 20, height: 20, }} source={require('../../assets/images/vector/gmail-logo.jpg')} />
                    </View>
                </View>
                <Text size="small" align="center" style={{ paddingHorizontal: 10 }}>By continuing, you may receive an SMS for verification. Message and data rates may apply.</Text>
                <Button
                    style={{ alignSelf: 'center' }}
                    type='primary'
                    icon={{ icon: 'send', pack: 'material' }}
                    disabled={!isValidPhoneNumber(phoneNumberInput, countryCode)}
                    width="full" text="Get passcode"
                    onPress={() => {
                        console.log(phoneNumberInput)
                    }} />
            </View>
        </KeyboardAvoidingView >
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                // this.closeButtonFunction()
            }}>
            <View style={{
                flex: 1.5,
                justifyContent: 'center',
                alignItems: "center",
                backgroundColor: 'transparent'
            }}>
                <View style={{
                    padding: 10,
                    width: '70%',
                    height: 'auto',
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: '#cdd2c9',
                    backgroundColor: '#f1f3f4f3',
                }}>
                    <TextInput
                        style={{
                            color: 'cornflowerblue',
                            fontSize: 20,
                            textAlign: 'left',
                            fontWeight: '300',
                        }}
                        onChangeText={(text) => setCountrySearch(text)}
                        placeholder="Search for Country">
                        {countrySearch}
                    </TextInput>
                    <FlatList
                        data={DATA.filter(item => item.title.toLowerCase().includes(countrySearch.toLowerCase()))}
                        ListEmptyComponent={<Text align="center">No supported countries</Text>}
                        renderItem={({ item, index, separators }) => {
                            return <Pressable
                                onPressIn={() => setPressing(item.title)}
                                onPressOut={() => setPressing('')}
                                style={{

                                    borderBottomColor: '#38383874', borderBottomWidth: index === DATA.length - 1 ? 0 : 1, opacity: pressing === item.title ? .7 : 1
                                }}
                                onPress={() => {
                                    setModalVisible(false)
                                    handleCountryChange(item.id)
                                }}>
                                <View orientation="row" align="center"
                                    style={{
                                        backgroundColor: 'transparent',
                                    }} >
                                    <Image source={item.image} style={{ width: 30, height: 20, marginHorizontal: 10 }} />
                                    <Text>{item.title}</Text>
                                    <Text size="default" style={{
                                        backgroundColor: 'transparent',
                                        position: "absolute",
                                        right: 0
                                    }}>{`(+${getCountryCallingCode(item.id as CountryCode)})`} </Text>
                                </View>
                            </Pressable>
                        }}
                        keyExtractor={item => item.id} />
                </View>
            </View>
        </Modal >
    </View >

}

export default SignUp;