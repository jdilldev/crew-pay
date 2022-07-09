import { useUser } from '@realm/react';
import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import { Modal, Pressable, SafeAreaView, ScrollView } from 'react-native';
import { Button, Vector, Text, View, isValidEmail, TextInput } from '../../../styles/styles'
import RealmContext, { User } from '../../../database'
import { useAuthenticatedStore } from '../../../GlobalUserSettingsContext';
const { useObject, useRealm } = RealmContext
import CheckBox from '@react-native-community/checkbox';
import validator from 'validator';
import DatePicker from 'react-native-date-picker'

import {
    parsePhoneNumber,
    isValidNumberForRegion,
    CountryCode,
    parseNumber,
    parsePhoneNumberWithError,
    ParseError,
    isPossiblePhoneNumber,
    validatePhoneNumberLength,
} from 'libphonenumber-js'

import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColor } from '../../../components/Themed';
import useColorScheme from '../../../hooks/useColorScheme';
import { UpdateMode } from 'realm';
import { DEVICE_WIDTH } from '../../../constants/Constants';
{/* <LinearGradient style={{ width: 40, height: 40, borderRadius: 40, justifyContent: 'center', alignItems: 'center', display: 'flex' }} colors={['#467e7c', '#9dd8c2',]}>{icon}</LinearGradient>
 */}


type CommonFieldProps = {
    value: string,
    setValue: (newVal: string) => void | ((_: any) => void),
    label: string,
    readonly?: boolean,
    icon?: string,
    width?: string
}

type NonRegionalFieldProps = {
    fieldType: 'email' | 'text' | 'number' | 'ssn' | 'birthday'
    region?: never
    subType?: 'name' | 'familyName' | 'addressCity'
}

type RegionalFieldProps = {
    fieldType: 'phone' | 'street' | 'postal-code' | 'passport'
    region: CountryCode,
    subType?: never
}

type FieldProps = CommonFieldProps & (RegionalFieldProps | NonRegionalFieldProps)


const phoneValidation = (phone: string, region: CountryCode): string => {
    try {
        parsePhoneNumberWithError(phone, region)
        const checkLength = validatePhoneNumberLength(phone, region)
        const validPhoneNumber = isValidNumberForRegion(phone, region)
        return checkLength ? checkLength : validPhoneNumber ? '' : 'Please enter a valid phone number'

    } catch (e) {
        const parseError = (e as ParseError).message

        return parseError
    }
}

const emailValidation = (email: string) => {
    return isValidEmail(email)
}

const addressValidation = (address: string) => {
    //use smarty or other address validator
    return true
}

const postalCodeValidation = (postalCode: string, region: CountryCode) => {
    //check if validator.PostalCodeLocale has region
    return validator.isPostalCode(postalCode, region as validator.PostalCodeLocale)
}

const passportValidation = (passport: string, region: CountryCode) => {
    return validator.isPassportNumber(passport, region)
}


const Field = ({ value, setValue, fieldType, icon, label, width, region, subType, readonly = false }: FieldProps) => {
    const [isFocused, setIsFocused] = useState(false)
    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const errorColor = useThemeColor({}, 'error')
    const textColor = useThemeColor({}, 'text')
    const focusedColor = useThemeColor({}, 'focused')

    let field = <></>

    switch (fieldType) {
        case 'email':
            field = <TextInput
                style={{ fontSize: 17 }}
                textContentType='emailAddress'
                autoComplete='email'
                autoCapitalize={'none'}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChangeText={(e) => {
                    setValue(e)
                    if (emailValidation(e)) {
                        setErrorMessage('')
                    } else {
                        setErrorMessage("Please enter a valid email address")
                    }
                }}>{value}</TextInput>
            break
        case 'phone':
            field = <TextInput
                textContentType='telephoneNumber'
                autoComplete='tel-national'
                value={isValidNumberForRegion(value, region) ? parsePhoneNumber(value, region).formatNational() : value}
                style={{ fontSize: 17, letterSpacing: 1 }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChangeText={(e) => {
                    setValue(e)
                    const result = phoneValidation(e, region)

                    if (result === '')
                        setErrorMessage('')
                    if (e !== '' && ((isPossiblePhoneNumber(e, region) || result === 'TOO_LONG' || result === 'NOT_A_NUMBER')))
                        result === 'TOO_LONG' ? setErrorMessage('Invalid phone number: too many digits') : result === 'NOT_A_NUMBER' ? setErrorMessage('Invalid phone number: digits only') : setErrorMessage(result)
                    else
                        setErrorMessage(' ')

                }} />
            break
        case 'street':
            field = <TextInput
                autoComplete='street-address'
                textContentType='streetAddressLine1'
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChangeText={setValue}
            >{value}</TextInput>
            break
        case 'postal-code':
            field = <TextInput
                autoComplete='postal-code'
                textContentType='postalCode'
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChangeText={(e) => {
                    setValue(e)
                    if (e.length >= 5)
                        postalCodeValidation(e, region) ? setErrorMessage('') : setErrorMessage(`Invalid ${region} postal code `)
                    else
                        setErrorMessage(' ')
                }}
            >{value}</TextInput>
            break
        case 'text':
            field = <TextInput
                autoComplete={subType === 'familyName' ? 'name-family' : subType === 'name' ? 'name' : 'postal-address-locality'}
                textContentType={subType !== undefined ? subType : 'none'}
                editable={!readonly}
                selectTextOnFocus
                style={{ fontSize: 17 }}
                value={value}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChangeText={(e) => {
                    setValue(e);
                }}
            />
            break;
        case 'number':
            return <Text>number</Text>
        case 'ssn':
            const [hidden, setHidden] = useState(true)
            const [first, setFirst] = useState('')
            const [second, setSecond] = useState('')
            const [third, setThird] = useState('')

            useEffect(() => {
                if ((first + second + third).length === 9)
                    setValue(first + second + third)
            }, [first, second, third])

            field = <View flex={1} orientation='row' transparent alignItems='center' justifyContent='center' marginRight={5}>
                <TextInput
                    value={first}
                    onChangeText={setFirst}
                    maxLength={3}
                    style={{ letterSpacing: 2, fontSize: 17, flex: .8, }}
                    secureTextEntry={hidden}
                    placeholder={'###'} />
                <TextInput editable={false} style={{ flex: .3, paddingLeft: 3 }}>{'-'}</TextInput>
                <TextInput
                    value={second}
                    onChangeText={setSecond}
                    maxLength={2}
                    style={{ letterSpacing: 2, fontSize: 17, flex: .6 }}
                    secureTextEntry={hidden}
                    placeholder={'##'} />
                <TextInput editable={false} style={{ flex: .2, }}>{'-'}</TextInput>
                <TextInput
                    value={third}
                    onChangeText={setThird}
                    maxLength={4}
                    style={{ letterSpacing: 2, fontSize: 17, flex: 1.1 }}
                    secureTextEntry={false}
                    placeholder={'####'} />
                <Vector name='eye-outline' pack='ion' onPress={() => setHidden(!hidden)} />
            </View>
            break
        case 'passport':
            return <Text>passport</Text>
        case 'birthday':
            const today = new Date();
            const _8yearsAgo = new Date(today.getFullYear() - 8, today.getMonth(), today.getDate())
            const [date, setDate] = useState<Date>(_8yearsAgo)
            field = <>
                <Text
                    spacing={false}
                    textAlign='center'
                    onPress={() => setDatePickerOpen(!datePickerOpen)}
                    fontSize={17}>
                    {value}
                </Text>
                <DatePicker
                    modal
                    mode='date'
                    maximumDate={_8yearsAgo}
                    androidVariant='nativeAndroid'
                    open={datePickerOpen}
                    date={date}
                    onConfirm={(date) => {
                        setDate(date)
                        setValue(date?.toLocaleDateString('en-us', { year: "numeric", month: 'long', day: "numeric" }))
                    }}
                    onCancel={() => {
                        setDatePickerOpen(false)
                    }}
                />
            </>
            break;
    }

    return <View marginLeft={10} width={width ? width : '100%'} spacing={true}>
        <View orientation='row' alignItems='center' marginBottom={2}>
            <Text type={errorMessage !== '' ? 'error' : isFocused ? 'focused' : 'default'} marginRight={2} spacing={false} size='small'>{label}</Text>
            {icon && <Vector name={icon} width={15} height={12} onPress={() => fieldType === 'birthday' ? setDatePickerOpen(!datePickerOpen) : null} />}
        </View>

        <View height={35} marginRight={10} transparent orientation='row' alignItems='center' backgroundColor={'#98989815'} borderRadius={0} borderWidth={1} borderColor={errorMessage !== '' ? errorColor : isFocused ? focusedColor : textColor} padding={5}>
            {<View flex={1} transparent marginLeft={2}>{field}</View>}
            {errorMessage === '' && value !== '' ? <Vector name='check' width={10} height={10} /> : null}
        </View>
        {errorMessage.trim() !== '' && <Text spacing={false} type='error' size='small'>{errorMessage}</Text>}
    </View>
}
const Application = ({ region, openFromProfile, setOpenFromProfile }: { region: CountryCode, openFromProfile: boolean, setOpenFromProfile: (open: boolean) => void }) => {
    const realm = useRealm()
    const { currentUserID } = useAuthenticatedStore()
    const currentUser = currentUserID ? useObject(User, currentUserID) : null
    const applicationID = currentUser ? currentUser.applicationID : null
    const [applicationModalVisibile, setApplicationModalVisible] = useState(!applicationID)

    //fields
    const [firstName, setFirstName] = useState(currentUser?.firstName || '')
    const [lastName, setLastName] = useState(currentUser?.lastName || '')
    const [phone, setPhone] = useState(currentUser?.phone || '')
    const [email, setEmail] = useState(currentUser?.email || '')
    const [streetAddress, setStreetAddress] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [dob, setDob] = useState('')
    const [idNumber, setIdNumber] = useState('')
    const [userAgreementCheck, setUserAgreementCheck] = useState(false)
    const [termsAndDisclosuresCheck, settermsAndDisclosuresCheck] = useState(false)

    const textColor = useThemeColor({}, 'text')
    const backgroundColor = useThemeColor({}, 'background')

    const saveData = () => {
        if (currentUser) {
            try {
                realm.write(() => {
                    realm.create(
                        User,
                        {
                            _id: currentUserID,
                            firstName,
                            lastName,
                            phone,
                            email,
                            //address: unit.helpers.createAddress(streetAddress, null, city, null, postalCode, region).toString(),
                            dob,
                            // uniqueVerificationNumber: idNumber
                        },
                        UpdateMode.Modified
                    );
                });
            } catch (err) {
                console.log("Error saving user data: " + err);
            }
        }

    }

    const handleClose = () => {
        setApplicationModalVisible(false)
        setOpenFromProfile(false)
        setUserAgreementCheck(false)
        settermsAndDisclosuresCheck(false)

        saveData()
        if (currentUser?.verificationType === 'ssn')
            setIdNumber('')
    }

    const isFormInvalid = () => {
        const idValid = currentUser?.verificationType === 'ssn'
            ? idNumber.length === 9
            : passportValidation(idNumber, region)

        return !(phoneValidation(phone, region) === ''
            && emailValidation(email)
            && userAgreementCheck
            && termsAndDisclosuresCheck
            && firstName !== ''
            && lastName !== ''
            && postalCodeValidation(postalCode, region)
            && city !== ''
            && streetAddress !== ''
            && idValid
            && dob !== '')
    }

    // get created at value for all objects and embedded objects and sort them and color them by type
    return (currentUserID && currentUser) ?
        <Modal
            animationType="slide"
            transparent={true}
            visible={applicationModalVisibile || openFromProfile}
            onRequestClose={() => handleClose()}>
            <SafeAreaView style={{
                flex: 1.5,
                margin: 5,
                justifyContent: 'center',
                alignItems: "center",
                backgroundColor: 'transparent',
            }}>
                <View backgroundColor={backgroundColor} style={{ width: '85%', height: 'auto', maxHeight: '80%', overflow: 'scroll', backgroundColor, borderWidth: 2, borderColor: 'lightgray', }} borderRadius={20} display='flex' padding={10}>
                    <Text textAlign='center' fontWeight='200' spacing={false}>{'Application'}</Text>
                    <ScrollView>
                        <Text type='primary' size='small'>{'Personal Details'.toUpperCase()}</Text>
                        <View orientation='row'>
                            <Field width={'48%'} fieldType='text' label={'First Name'} subType={'name'} value={firstName} setValue={setFirstName} />
                            <Field width={'48%'} fieldType='text' label={'Last Name'} subType={'familyName'} value={lastName} setValue={setLastName} />
                        </View>
                        <Field icon={'phone'} fieldType='phone' region={region} label={'Phone'} value={phone} setValue={setPhone} />
                        <Field icon={'email'} fieldType='email' label={'Email'} value={email} setValue={setEmail} />

                        <Text marginTop={15} type='primary' size='small' spacing={false}>{'Address'.toUpperCase()}</Text>
                        <View orientation='row'>
                            <Field width={'72%'} fieldType='street' region={region} label={'Street'} value={streetAddress} setValue={setStreetAddress} />
                            <Field width={'23%'} fieldType='text' label={'Country'} value={currentUser.nationality} readonly setValue={() => { }} />
                        </View>
                        <View orientation='row'>
                            <Field width={'55%'} fieldType='text' label={'City'} value={city} setValue={setCity} />
                            <Field width={'40%'} fieldType='postal-code' region={region} label={'Postal Code'} value={postalCode} setValue={setPostalCode} />
                        </View>

                        <Text marginTop={15} type='primary' size='small' spacing={false}>{'Identity Verification'.toUpperCase()}</Text>
                        <View orientation='row' justifyContent='center' alignItems='center' flexWrap='wrap'>
                            <Field width={'63%'} icon={'calendar'} fieldType='birthday' label={'Date of Birth'} value={dob} setValue={setDob} />
                            {currentUser.verificationType === 'ssn'
                                ? <Field width={DEVICE_WIDTH < 400 ? '70%' : '63%'} icon={'ssn'} fieldType='ssn' label={'Social Security Number'} value={idNumber} setValue={setIdNumber} />
                                : <Field width={'63%'} region={region} icon={'passport'} fieldType='passport' label={'Passport Number'} value={idNumber} setValue={setIdNumber} />}
                        </View>
                        <View orientation='row' justifyContent='center' alignItems='center'>
                            <CheckBox
                                tintColors={{ true: 'teal', false: 'teal' }}
                                onCheckColor='teal'
                                tintColor={textColor}
                                onTintColor='teal'
                                lineWidth={1}
                                style={{ width: 13, height: 13 }}
                                boxType='circle'
                                onChange={() => setUserAgreementCheck(!userAgreementCheck)}
                            />
                            <Text fontSize={14} spacing={false}>{' User Agreement'}</Text>
                        </View>
                        <View spacing={true} orientation='row' justifyContent='center' alignItems='center'>
                            <CheckBox
                                tintColors={{ true: 'teal', false: 'teal' }}
                                onCheckColor='teal'
                                tintColor={textColor}
                                onTintColor='teal'
                                lineWidth={1}
                                style={{ width: 13, height: 13 }}
                                boxType='circle'
                                onChange={() => settermsAndDisclosuresCheck(!termsAndDisclosuresCheck)}
                            />
                            <Text fontSize={14} spacing={false}>{' Terms and Disclosures'}</Text>
                        </View>
                    </ScrollView>
                    <View orientation='row' justifyContent='space-around' spacing={true}>
                        <Button weight='300' outlined size='smallButton' text={'Cancel'} onPress={() =>
                            handleClose()} />
                        <Button weight='300' type='primary' size='smallButton' disabled={isFormInvalid()} text={'Submit'} onPress={() => console.log('mim')} />
                    </View>
                </View>
            </SafeAreaView>
        </Modal >
        : <Text>unknown</Text>
}

export default Application

