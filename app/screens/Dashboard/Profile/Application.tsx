import React, { useState } from 'react'
import { Modal, SafeAreaView, ScrollView } from 'react-native';
import { Button, Text, View, } from '../../../styles/styles'
import RealmContext, { User } from '../../../database'
import { useAuthenticatedStore } from '../../../GlobalUserSettingsContext';
const { useObject, useRealm } = RealmContext
import { useCreateApplication } from '../../../hooks/useUnit';
import CheckBox from '@react-native-community/checkbox';

import {
    CountryCode,
    getCountryCallingCode,

} from 'libphonenumber-js'
import { LinearGradient } from 'expo-linear-gradient';
import { useThemeColor } from '../../../components/Themed';
import { UpdateMode } from 'realm';
import { DEVICE_WIDTH } from '../../../constants/Constants';
import { ApplicationStatus } from "@unit-finance/unit-node-sdk";
import { emailValidation, passportValidation, phoneValidation, postalCodeValidation } from '../../../utils';
import { Field } from '../../../components/Field';
{/* <LinearGradient style={{ width: 40, height: 40, borderRadius: 40, justifyContent: 'center', alignItems: 'center', display: 'flex' }} colors={['#467e7c', '#9dd8c2',]}>{icon}</LinearGradient>
 */}



const Application = ({ region, openFromProfile, setOpenFromProfile, status, updateStatus }: { region: CountryCode, openFromProfile: boolean, setOpenFromProfile: (open: boolean) => void, status: ApplicationStatus | 'Uninitiated' | 'Loading', updateStatus: (newStatus: ApplicationStatus | 'Uninitiated') => void }) => {
    const realm = useRealm()
    const { currentUserID } = useAuthenticatedStore()
    const currentUser = currentUserID ? useObject(User, currentUserID) : null
    const verificationMethod = currentUser?.verificationType!
    //const [applicationModalVisibile, setApplicationModalVisible] = useState(!applicationID)


    //fields
    const [firstName, setFirstName] = useState(currentUser?.firstName || '')
    const [lastName, setLastName] = useState(currentUser?.lastName || '')
    const [phone, setPhone] = useState(currentUser?.phone || '')
    const [email, setEmail] = useState(currentUser?.email || '')
    const [streetAddress, setStreetAddress] = useState('')
    const [streetAddress2, setStreetAddress2] = useState('')
    const [city, setCity] = useState('')
    const [postalCode, setPostalCode] = useState('')
    const [dob, setDob] = useState(currentUser?.dob || '')
    const [idNumber, setIdNumber] = useState('')
    const [userAgreementCheck, setUserAgreementCheck] = useState(false)
    const [termsAndDisclosuresCheck, settermsAndDisclosuresCheck] = useState(false)

    const textColor = useThemeColor({}, 'text')
    const backgroundColor = useThemeColor({}, 'background')
    const tintColor = useThemeColor({}, 'success')
    //https://developers.google.com/maps/documentation/javascript/places-autocomplete
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
        // setApplicationModalVisible(false)
        setOpenFromProfile(false)
        setUserAgreementCheck(false)
        settermsAndDisclosuresCheck(false)
        saveData()

        if (currentUser?.verificationType === 'ssn')
            setIdNumber('')
    }

    const onSubmit = async () => {

        try {
            realm.write(() => {
                realm.create(
                    User,
                    {
                        _id: currentUserID,
                        address: streetAddress,
                        uniqueVerificationNumber: idNumber
                    },
                    UpdateMode.Modified
                );
            });
        } catch (err) {
            console.log("Error saving user dat on submit: " + err);
        }

        try {
            const { createApplication: { id, userStatus, documents, createdAt, error } } = await useCreateApplication({
                firstName,
                lastName,
                countryCallingCode: getCountryCallingCode(region),
                phoneNumber: phone,
                email: email,
                dob: dob.split('T')[0],
                idType: verificationMethod,
                idNumber,
                street1: streetAddress,
                street2: streetAddress2,
                city,
                postalCode,
                nationality: region
            })

            if (error) {
                console.log('error error, show error message')

            } else {
                updateStatus(userStatus)
                realm.write(() => {
                    if (currentUser)
                        currentUser.applicationID = id
                })
            }
        } catch (err) {
            console.log('Error submitting application to Unit ' + err)
        }
    }


    const isFormInvalid = () => {
        const idValid = verificationMethod === 'ssn'
            ? idNumber.length === 9
            : passportValidation(idNumber, region)

        return !(
            phoneValidation(phone, region) === ''
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

    const StatusModalContent = () => {
        return <View transparent={false} style={{ width: '75%', height: 'auto', maxHeight: '80%', overflow: 'scroll', backgroundColor, borderWidth: 2, borderColor: 'lightgray', }} borderRadius={20} display='flex' padding={10}>
            <Text textAlign='center'>You are approved!</Text>
            <Button type={'success'} style={{ width: '50%', alignSelf: 'center' }} size='smallButton' text={'Close'} onPress={() => handleClose()} />
        </View>
    }

    // get created at value for all objects and embedded objects and sort them and color them by type
    return (currentUserID && currentUser) ?
        <Modal
            animationType="slide"
            transparent={true}
            visible={openFromProfile}
            onRequestClose={() => handleClose()}>
            <SafeAreaView style={{
                flex: 1.5,
                margin: 5,
                justifyContent: 'center',
                alignItems: "center",
                backgroundColor: 'transparent',
            }}>
                {status !== 'Loading' && status !== 'Uninitiated'
                    ? <View backgroundColor={tintColor} style={{ width: '75%', height: 'auto', maxHeight: '80%', overflow: 'scroll', backgroundColor, borderWidth: 2, borderColor: 'lightgray', }} borderRadius={20} display='flex' padding={10}>
                        <Text textAlign='center'>You are approved!</Text>
                        <Button type={'default'} style={{ width: '50%', alignSelf: 'center' }} size='smallButton' text={'Close'} onPress={() => handleClose()} />
                    </View>
                    : <View backgroundColor={backgroundColor} style={{ width: '85%', height: 'auto', maxHeight: '80%', overflow: 'scroll', backgroundColor, borderWidth: 2, borderColor: 'lightgray', }} borderRadius={20} display='flex' padding={10}>
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
                            <Field fieldType='street' region={region} label={'Street'} value={streetAddress} setValue={setStreetAddress} />
                            <View orientation='row'>
                                <Field width={'72%'} fieldType='street' region={region} label={'Street 2 (optional)'} value={streetAddress2} setValue={setStreetAddress2} />
                                <Field width={'23%'} fieldType='text' label={'Country'} value={currentUser.nationality} readonly setValue={() => { }} />
                            </View>
                            <View orientation='row'>
                                <Field width={'55%'} fieldType='text' label={'City'} value={city} setValue={setCity} />
                                <Field width={'40%'} fieldType='postal-code' region={region} label={'Postal Code'} value={postalCode} setValue={setPostalCode} />
                            </View>

                            <Text marginTop={15} type='primary' size='small' spacing={false}>{'Identity Verification'.toUpperCase()}</Text>
                            <View orientation='row' justifyContent='center' alignItems='center' flexWrap='wrap'>
                                <Field width={'63%'} icon={'calendar'} fieldType='birthday' label={'Date of Birth'} value={dob} setValue={setDob} />
                                {verificationMethod === 'ssn'
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
                            <Button weight='300' outlined size='smallButton' text={'Cancel'} onPress={() => handleClose()} />
                            <Button weight='300' type='primary' size='smallButton' disabled={isFormInvalid()} text={'Submit'} onPress={() => onSubmit()} />
                        </View>
                    </View>
                }
            </SafeAreaView>
        </Modal >
        : <Text>unknown</Text>
}

export default Application

