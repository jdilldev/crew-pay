import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  View as DefaultView,
  Pressable,
  TextInput,
  Text as DefaultText,
  FlexAlignType,
  Dimensions,
  Image,
  Modal,
  FlatList,
} from 'react-native';
import {
  parsePhoneNumber,
  AsYouType,
  getCountryCallingCode,
  isSupportedCountry,
  isValidNumberForRegion,
  CountryCallingCode,
  isValidPhoneNumber,
  CountryCode,
} from 'libphonenumber-js'
import { ButtonProps, LoginType } from '../types';
import { TextProps, ViewProps, useThemeColor, IconProps, IconTypes, IoniconTypes, MaterialIconTypes, ZocialIconTypes, SimpleIconTypes } from '../types';
import { Ionicons, MaterialIcons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { COUNTRY_DATA } from '../constants/Constants';
import { ColorContext } from '../GlobalUserSettingsContext';

const FontSize = {
  'small': 12,
  'medium': 24,
  'large': 42,
  'default': 17,
  'smallButton': 15,
  'normalButton': 23,
  'largeButton': 30
}

const TextWeight = {
  'ultralight': "100",
  'light': "200",
  'normal': "300",
  'bold': "700",
  'thickkk': '900',
} as const;

const DEVICE_WIDTH = Dimensions.get('window').width - 60;


export function Text(props: TextProps,) {
  const {
    spacing = true,
    type = 'default',
    align,
    customColor,
    thickness = 'normal',
    size = 'default',
    lightColor,
    darkColor,
    style,
    ...otherProps } = props;
  const color = customColor ? customColor : useThemeColor({ light: lightColor, dark: darkColor }, type)
  const fontSize = FontSize[size]
  const fontWeight = TextWeight[thickness];

  return <DefaultText style={[{
    color,
    fontSize,
    fontWeight,
    marginTop: spacing ? 5 : 0,
    marginBottom: spacing ? 5 : 0,
    textAlign: align
  }, style]} {...otherProps} />;
}


export function View(props: ViewProps) {
  const {
    flex,
    orientation,
    align,
    justify,
    style,
    lightColor,
    darkColor,
    wrap = false,
    spacing = false,
    transparent,
    ...otherProps } = props;
  const backgroundColor = transparent ? 'transparent' : useThemeColor({ light: lightColor, dark: darkColor }, 'background')

  return <DefaultView style={
    [{
      display: 'flex',
      flexDirection: orientation,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      alignItems: align as FlexAlignType,
      justifyContent: justify,
      marginTop: spacing ? 5 : 0,
      marginBottom: spacing ? 5 : 0,
      // justifyContent: orientation === 'column' ? align : 'flex-start',
      backgroundColor,
      flex
    }, style]} {...otherProps} />;
}

export const Icon = ({ icon, pack, size = 'medium', color, lightColor, darkColor, ...otherProps }: IconProps) => {
  let Icon = null;
  let iconColor = color ? color : useThemeColor({ light: lightColor, dark: darkColor }, 'default')

  switch (pack) {
    case 'ion':
      Icon = <Ionicons name={icon as IoniconTypes} size={FontSize[size]} color={iconColor} {...otherProps} />
      break;
    case 'material':
      Icon = <MaterialIcons name={icon as MaterialIconTypes} size={FontSize[size]} color={iconColor} {...otherProps} />
      break;
    case 'simple':
      Icon = <SimpleLineIcons name={icon as SimpleIconTypes} size={FontSize[size]} color={iconColor} {...otherProps} />
      break;
    case 'zocial':
      Icon = <Zocial name={icon as ZocialIconTypes} size={FontSize[size]} color={iconColor} {...otherProps} />
      break;
  }

  return Icon;
}


export const Button = ({
  onPress,
  text,
  icon,
  iconPosition = 'start',
  outlined,
  shape = 'rounded',
  size = 'normalButton',
  capitalized,
  customColor,
  elevated,
  width,
  type = 'default',
  lightColor,
  darkColor,
  style,
  ...otherProps
}: ButtonProps) => {
  const color = customColor ? customColor : useThemeColor({ light: lightColor, dark: darkColor }, type)
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')
  let buttonTextColor = outlined ? color : backgroundColor
  let buttonBackgroundColor = outlined ? backgroundColor : color;

  const Shape = {
    'rounded': 7,
    'oval': 20,
    'square': 0,
  }

  const [pressing, setPressing] = useState(false)

  return (
    <Pressable
      onPress={(onPress)}
      onPressIn={() => { setPressing(true) }}
      onPressOut={() => setPressing(false)}
      style={[{
        opacity: otherProps.disabled ? .4 : pressing ? .8 : 1,
        width: width === 'medium' ? DEVICE_WIDTH / 2 : DEVICE_WIDTH,
        display: 'flex',
        flexDirection: icon ? (iconPosition === 'start' ? 'row' : 'row-reverse') : 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: buttonBackgroundColor,
        borderColor: outlined ? color : buttonBackgroundColor,
        borderWidth: 2,
        borderRadius: Shape[shape],
      }, style]} >
      {icon && <Icon icon={icon.icon} pack={icon.pack} color={buttonTextColor} style={{ marginHorizontal: 15 }} />}
      <Text
        thickness='bold'
        align='center'
        type={type}
        customColor={buttonTextColor}
        size={size}>{text}
      </Text>
    </Pressable>
  )
}

export const ButtonGroup = ({ buttons, otherProps }: { buttons: string[], otherProps?: ButtonProps }) => {

  return <View orientation='row' >
    {buttons.map(buttonText =>
      <Button shape='square'  {...otherProps} onPress={() => { }} text={buttonText}></Button>
    )}
  </View >
}

export const IconInput = ({ icon, pack, placeholder, type }: { icon: IconTypes, pack: 'ion' | 'material' | 'simple' | 'zocial', placeholder: string, type: LoginType }) => (
  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
    <View style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 25,
      height: 45,
      width: 45,
      shadowOffset: {
        width: -5,
        height: 10
      },
      shadowRadius: 12,
      shadowOpacity: .5
    }}>
      <Icon icon={icon} pack={pack} />
    </View>
    <TextInput
      placeholder={placeholder}
      style={{ fontSize: 24, paddingHorizontal: 12 }}
      textContentType={type === LoginType.PHONE ? 'telephoneNumber' : 'emailAddress'}
      autoComplete={type === LoginType.PHONE ? 'tel-device' : 'email'} />
  </View>
)


interface CustomInputProps {
  updateInput: (val: string) => void
  previousValue: string,
}

export const PhoneValidationInput = ({ updateInput, previousValue }: CustomInputProps) => {
  const { countryCode, countryCallingCode, } = useContext(ColorContext)
  const [phoneInput, setPhoneInput] = useState(previousValue)
  const [countryPickerVisibility, setCountryPickerVisibility] = useState(false);

  const phoneFormatter: AsYouType = new AsYouType(countryCode)

  const handlePhoneNumberChange = (newNumber: string) => {
    if (isValidPhoneNumber(newNumber, countryCode)) {
      phoneFormatter.input(newNumber)

      const formattedNumber =
        phoneFormatter
          .getNumber()!
          .formatInternational()
          .replace(`+${countryCallingCode} `, '');

      setPhoneInput(formattedNumber)
      updateInput(formattedNumber)
    } else {
      updateInput(newNumber)
    }
  }

  return <View transparent>
    <View
      orientation="row"
      align="center"
      justify="flex-start"
      spacing={false}
      transparent>
      <Pressable
        onPress={() => { setCountryPickerVisibility(true) }}
      >
        <Image
          style={{ width: 40, height: 25 }}
          source={{ uri: `https://countryflagsapi.com/png/${countryCode}` }} />
      </Pressable>

      <Text
        style={{ fontSize: 20, paddingLeft: 7 }}>
        {`+ ${countryCallingCode}`}
      </Text>

      <View orientation="row" style={{ borderRightColor: 'black', borderRightWidth: 1, marginHorizontal: 5, }} />
      <TextInput
        keyboardType={'phone-pad'}
        placeholder={'Enter phone number'}
        style={{ paddingRight: 0, fontSize: 20, }}
        onChangeText={handlePhoneNumberChange} >
        {phoneInput}
      </TextInput>
    </View>
    <CountryPicker
      visible={countryPickerVisibility}
      updateVisibility={(val: boolean) => setCountryPickerVisibility(val)}
    />
  </View>
}

export const isValidEmail = (emailAddress: string) => {
  const re = /\S+@\S+\.\S+/;


  return (re.test(emailAddress)) ? true : false
}

export const EmailValidationInput = ({ updateInput, previousValue }: CustomInputProps) => {
  const { countryCode, } = useContext(ColorContext)
  const [emailInput, setEmailInput] = useState(previousValue)
  const [countryPickerVisibility, setCountryPickerVisibility] = useState(false);


  const handleEmailChange = (newEmail: string) => {
    const trimmedEmail = newEmail.trim().toLowerCase()

    updateInput(newEmail)
    setEmailInput(trimmedEmail)
  }

  return <View transparent orientation='row' align='center'>
    <Pressable
      onPress={() => { setCountryPickerVisibility(true) }}
    >
      <Image
        style={{ width: 40, height: 25 }}
        source={{ uri: `https://countryflagsapi.com/png/${countryCode}` }} />
    </Pressable>
    <TextInput
      textAlign="center"
      keyboardType='email-address'
      placeholder={'Enter email address'}
      style={{ padding: 5, marginLeft: 5, fontSize: 20, fontWeight: '300', }}
      onChangeText={handleEmailChange} >
      {emailInput.toLowerCase()}
    </TextInput>
    <CountryPicker
      visible={countryPickerVisibility}
      updateVisibility={(val: boolean) => setCountryPickerVisibility(val)}
    />
  </View>

}

interface ICountryPickerProps {
  visible: boolean
  updateVisibility: (visibility: boolean) => void
}
export const CountryPicker = ({ visible, updateVisibility, }: ICountryPickerProps) => {
  const { setCountryCallingCode, setCountryCode } = useContext(ColorContext)
  const [countrySearch, setCountrySearch] = useState('')
  const [preSelectedCountry, setPreSelectedCountry] = useState('')

  const handleCountryChange = (newCountry: string) => {
    const newCountryAsCountryCode = newCountry.toUpperCase() as CountryCode
    if (isSupportedCountry(newCountryAsCountryCode)) {
      setPreSelectedCountry('')
      setCountryCode(newCountryAsCountryCode)
      setCountryCallingCode(getCountryCallingCode(newCountryAsCountryCode))
    }
  }
  return <Modal
    animationType="slide"
    transparent={true}
    visible={visible}>
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
          data={COUNTRY_DATA.filter(item => item.title.toLowerCase().includes(countrySearch.toLowerCase()))}
          ListEmptyComponent={<Text align="center">No supported countries</Text>}
          renderItem={({ item, index, separators }) => {
            const filteredCountries = COUNTRY_DATA.filter(item => item.title.toLowerCase().includes(countrySearch.toLowerCase()))
            return <Pressable
              onPressIn={() => setPreSelectedCountry(item.title)}
              onPressOut={() => setPreSelectedCountry('')}
              style={{

                borderBottomColor: '#38383874', borderBottomWidth: index === filteredCountries.length - 1 ? 0 : 1, opacity: preSelectedCountry === item.title ? .7 : 1
              }}
              onPress={() => {
                updateVisibility(false)
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
}

export default StyleSheet.create({
  h1: {
    fontSize: 54,
    fontWeight: 'bold',
  },
  body1: {
    fontSize: 2
  },
  spacing: {
    marginTop: 10,
    marginBottom: 10
  }
});