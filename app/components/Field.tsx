import React, { Dispatch, ReactNode, SetStateAction, useEffect, useState } from 'react'
import validator from 'validator';
import DatePicker from 'react-native-date-picker'
import {
    parsePhoneNumber,
    isValidNumberForRegion,
    CountryCode,
    getCountryCallingCode,
    parseNumber,
    parsePhoneNumberWithError,
    ParseError,
    isPossiblePhoneNumber,
    validatePhoneNumberLength,
} from 'libphonenumber-js'
import { Vector, View, TextInput, Text, ButtonGroup, TagInput } from '../styles/styles';
import { useThemeColor } from '../types';
import { emailValidation, phoneValidation, postalCodeValidation } from '../utils';

type ArrayFieldProps = {
    fieldType: 'tag-input'
    value: string[]
    setValue: ((newVal: string[]) => void)
    region?: never
    subType?: never
    maxChars?: never
}

type CommonFieldProps = {
    label: string,
    readonly?: boolean,
    noStyle?: boolean,
    icon?: string,
    width?: string
    buttons?: string[]
    maxChars?: number
}

type NonRegionalFieldProps = {
    value: string,
    setValue: (newVal: string) => void | ((_: any) => void),
    fieldType: 'email' | 'text' | 'number' | 'ssn' | 'birthday' | 'button-group'
    region?: never
    subType?: 'name' | 'familyName' | 'addressCity'
}

type RegionalFieldProps = {
    value: string,
    setValue: (newVal: string) => void | ((_: any) => void),
    fieldType: 'phone' | 'street' | 'postal-code' | 'passport'
    region: CountryCode,
    subType?: never
}

type FieldProps = CommonFieldProps & (RegionalFieldProps | NonRegionalFieldProps | ArrayFieldProps)



export const Field = ({ value, setValue, fieldType, icon, label, width, region, buttons, subType, maxChars, readonly = false, noStyle = false }: FieldProps) => {
    const [isFocused, setIsFocused] = useState(false)
    const [datePickerOpen, setDatePickerOpen] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const errorColor = useThemeColor({}, 'error')
    const textColor = useThemeColor({}, 'text')
    const focusedColor = useThemeColor({}, 'focused')
    const gray = useThemeColor({}, 'divider')


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
            const phoneNumber = value as string
            field = <TextInput
                textContentType='telephoneNumber'
                autoComplete='tel-national'
                value={isValidNumberForRegion(phoneNumber, region) ? parsePhoneNumber(phoneNumber, region).formatNational() : phoneNumber}
                style={{ fontSize: 17, letterSpacing: 1 }}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChangeText={(e) => {
                    setValue(e)
                    const result = phoneValidation(e, region)

                    if (result === '')
                        setValue(parsePhoneNumber(e, region).nationalNumber)
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
            const text = value as string
            field = <TextInput
                autoComplete={subType === 'familyName' ? 'name-family' : subType === 'name' ? 'name' : 'postal-address-locality'}
                textContentType={subType !== undefined ? subType : 'none'}
                editable={!readonly}
                selectTextOnFocus
                style={{ fontSize: 17 }}
                maxLength={maxChars ? maxChars + 1 : undefined}
                value={text}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onChangeText={(e) => {
                    setValue(e);
                    if (maxChars && e.length > maxChars)
                        setErrorMessage('Too many characters')
                    else
                        setErrorMessage('')
                }}
            />
            break;
        case 'tag-input':
            field = <TagInput updateValue={setValue} />
            break
        case 'button-group':
            field = <ButtonGroup buttons={buttons!} updateValue={setValue} />
            break
        case 'number':
            field = <Text>number</Text>
            break;
        case 'ssn':
            const [hidden, setHidden] = useState(true)
            const [first, setFirst] = useState('')
            const [second, setSecond] = useState('')
            const [third, setThird] = useState('')

            useEffect(() => {
                if ((first + second + third).length === 9)
                    setValue(first + second + third)
                else
                    setValue('')
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
            const dateAsString = value as string
            const today = new Date()
            const _8yearsAgo = new Date(today.getFullYear() - 8, today.getMonth(), today.getDate())
            const savedDate = value ? new Date(dateAsString) : _8yearsAgo
            const [date, setDate] = useState<Date>(savedDate)

            field = <>
                <Text
                    spacing={false}
                    textAlign='center'
                    onPress={() => setDatePickerOpen(!datePickerOpen)}
                    fontSize={17}>
                    {value === '' ? '' : date?.toLocaleDateString('en-us', { year: "numeric", month: 'long', day: "numeric" })}
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
                        setValue(date.toISOString())
                    }}
                    onCancel={() => {
                        setDatePickerOpen(false)
                    }}
                />
            </>
            break;
    }

    const noStyleStyles = (fieldType === 'button-group') ? { borderBottomWidth: 0 } : { borderBottomWidth: 1 }
    const withStyleStyles = { 'borderWidth': 1, 'backgroundColor': '#98989815', padding: 5 }

    return <View marginLeft={10} width={width ? width : '100%'} spacing={true} transparent>
        <View orientation='row' alignItems='center' marginBottom={2} transparent>
            <Text type={errorMessage !== '' ? 'error' : isFocused ? 'focused' : 'default'} marginRight={2} spacing={false} size='small'>{label}</Text>
            {icon && <Vector name={icon} width={15} height={12} onPress={() => fieldType === 'birthday' ? setDatePickerOpen(!datePickerOpen) : null} />}
        </View>


        <View height={35} marginRight={10} transparent orientation='row' alignItems='center' style={noStyle ? noStyleStyles : withStyleStyles} borderColor={errorMessage !== '' ? errorColor : isFocused ? focusedColor : textColor}>
            {<View flex={1} transparent marginLeft={2}>{field}</View>}
            {errorMessage === '' && value !== '' && fieldType !== 'button-group' ? <Vector name='check' width={10} height={10} style={{ marginRight: 3 }} /> : null}
        </View>
        {errorMessage.trim() !== '' && <Text spacing={false} type='error' size='small'>{errorMessage}</Text>}

    </View>
}