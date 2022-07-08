import React, { useState } from 'react';
import {
  StyleSheet,
  View as DefaultView,
  Pressable,
  TextInput as DefaultTextInput,
  Text as DefaultText,
  Button as DefaultButton,
  FlexAlignType,
  Dimensions,
  Image,
  Modal,
  FlatList,
  TextStyle,
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
import { ButtonProps, LoginType, TextInputProps } from '../types';
import { TextProps, ViewProps, useThemeColor, VectorProps, IconTypes, IoniconTypes, MaterialIconTypes, ZocialIconTypes, SimpleIconTypes } from '../types';
import { Ionicons, MaterialIcons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { COUNTRY_DATA } from '../constants/Constants';
import { useStore } from '../GlobalUserSettingsContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { getSVG } from '../constants/SvgIcons';
import validator from 'validator';
import useColorScheme from '../hooks/useColorScheme';

const FontSize = {
  'small': 12,
  'medium': 24,
  'large': 30,
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


export function Text(props: TextProps) {
  const {
    spacing = true,
    type = 'default',
    customColor,
    size = 'default',
    lightColor,
    darkColor,
    ...rest } = props;
  const color = customColor ? customColor : useThemeColor({ light: lightColor, dark: darkColor }, type)
  const fontSize = FontSize[size]

  const { style, onPress, children, ...otherProps } = rest
  return <DefaultText
    style={[{
      color,
      fontSize,
      marginTop: spacing ? 5 : 0,
      marginBottom: spacing ? 5 : 0,
    }, style, otherProps]}
    onPress={onPress}
    children={children}
  />;
}

export function TextInput(props: TextInputProps) {
  const {
    lightColor,
    darkColor,
    ...rest } = props;
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text')
  const { style, ...otherProps } = rest
  return <DefaultTextInput
    placeholderTextColor={color}
    style={[{
      color,
    }, style]}
    {...otherProps} />;
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

export const Vector = ({
  width = 20,
  height = 20,
  size = 20,
  name,
  pack,
  color = 'black',
  lightColor,
  darkColor,
  onPress,
  ...otherProps }: VectorProps) => {
  let Icon = null;
  const iconColor = color ? color : useThemeColor({ light: lightColor, dark: darkColor }, 'default')

  if (name && pack) {
    switch (pack) {
      case 'ion':
        Icon = <Ionicons name={name as IoniconTypes} color={iconColor} size={size} {...otherProps} />
        break;
      case 'material':
        Icon = <MaterialIcons name={name as MaterialIconTypes} color={iconColor} size={size} {...otherProps} />
        break;
      case 'simple':
        Icon = <SimpleLineIcons name={name as SimpleIconTypes} color={iconColor} size={size}{...otherProps} />
        break;
      case 'zocial':
        Icon = <Zocial name={name as ZocialIconTypes} color={iconColor} size={size} {...otherProps} />
        break;
    }
  } else {
    Icon = getSVG(name, color, width, height)
  }


  return onPress ? <Pressable onPress={onPress}>{Icon}</Pressable> : Icon;
}


export const Button = ({
  onPress,
  text,
  icon,
  weight = 'bold',
  iconPosition = 'start',
  outlined,
  shape = 'rounded',
  size = 'normalButton',
  capitalized,
  customColor,
  elevated,
  fullWidth,
  type = 'default',
  lightColor,
  darkColor,
  style,
  ...otherProps
}: ButtonProps) => {
  const color = customColor ? customColor : useThemeColor({ light: lightColor, dark: darkColor }, type)
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')
  const buttonTextColor = outlined ? color : backgroundColor
  const buttonBackgroundColor = outlined ? backgroundColor : color;

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
        paddingHorizontal: 30,
        width: fullWidth ? '100%' : 'auto',
        display: 'flex',
        flexDirection: icon ? (iconPosition === 'start' ? 'row' : 'row-reverse') : 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: buttonBackgroundColor,
        borderColor: outlined ? color : buttonBackgroundColor,
        borderWidth: 2,
        borderRadius: Shape[shape],
      }, style]} >
      {icon && <Vector {...icon} color={buttonTextColor} />}
      <Text
        marginLeft={3}
        fontWeight={weight}
        type={type}
        customColor={buttonTextColor}
        size={size}>{text}
      </Text>
    </Pressable>
  )
}

export const ButtonGroup = ({ buttons, otherProps }: { buttons: string[], otherProps?: ButtonProps }) => {
  const [selected, setSelected] = useState(0)
  return <View orientation='row' justify='center' borderColor={'teal'} borderWidth={1} width={DEVICE_WIDTH}>
    {buttons.map((buttonText, index) =>
      <Button type='primary' key={buttonText} outlined={selected !== index} size='smallButton' shape={'square'} style={{ width: (DEVICE_WIDTH) / (buttons.length), borderColor: 'transparent', marginHorizontal: -1 }} onPress={() => { setSelected(index) }} text={buttonText} {...otherProps}></Button>
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
      <Vector name={icon} pack={pack} />
    </View>
    <TextInput
      placeholder={placeholder}
      style={{ fontSize: 24, paddingHorizontal: 12 }}
      textContentType={type === LoginType.PHONE ? 'telephoneNumber' : 'emailAddress'}
      autoComplete={type === LoginType.PHONE ? 'tel-device' : 'email'} />
  </View>
)




export const PhoneValidationInput = () => {
  const [phoneInput, setPhoneInput] = useState('')
  const [countryPickerVisibility, setCountryPickerVisibility] = useState(false);
  const { countryCode, countryCallingCode, setUserPhone } = useStore()
  const placeholderTextColor = useThemeColor({}, 'default')

  const phoneFormatter: AsYouType = new AsYouType(countryCode)

  const handlePhoneNumberChange = (newNumber: string) => {
    if (isValidPhoneNumber(newNumber, countryCode)) {
      phoneFormatter.input(newNumber)

      const formattedNumber =
        phoneFormatter
          .getNumber()!
          .formatInternational()


      setPhoneInput(formattedNumber.replace(`+${countryCallingCode} `, ''))
      setUserPhone(parsePhoneNumber(newNumber, countryCode).format('E.164'))
    } else {
      setUserPhone(newNumber)
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
        placeholderTextColor={placeholderTextColor}
        style={{ paddingRight: 0, fontSize: 20, fontWeight: '300' }}
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
  return (re.test(emailAddress) && validator.isEmail(emailAddress)) ? true : false
}

export const EmailValidationInput = () => {
  const [emailInput, setEmailInput] = useState('')
  const [countryPickerVisibility, setCountryPickerVisibility] = useState(false);
  const { countryCode, setUserEmail } = useStore()
  const placeholderTextColor = useThemeColor({}, 'default')

  const handleEmailChange = (newEmail: string) => {
    const trimmedEmail = newEmail.trim().toLowerCase()

    setUserEmail(trimmedEmail)
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
      placeholderTextColor={placeholderTextColor}
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
  const [countrySearch, setCountrySearch] = useState('')
  const [preSelectedCountry, setPreSelectedCountry] = useState('')
  const { setCountryCallingCode, setCountryCode } = useStore()

  const background = useThemeColor({}, 'background')
  const border = useThemeColor({}, 'default')

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
    visible={visible}
  >
    <Pressable
      style={{ flex: 1.5, justifyContent: 'center', alignItems: 'center' }}
      onPressOut={() => updateVisibility(false)}
    >
      <SafeAreaView style={{
        backgroundColor: background,
        width: '70%',
        padding: 10,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: border,
      }}>
        <TextInput
          style={{
            color: 'cornflowerblue',
            fontSize: 20,
            textAlign: 'left',
            fontWeight: '300',
          }}
          onChangeText={(text) => setCountrySearch(text)}
          placeholder="Search for Country"
          placeholderTextColor={'cornflowerblue'}
        >
          {countrySearch}
        </TextInput>
        <FlatList
          data={COUNTRY_DATA.filter(item => item.title.toLowerCase().includes(countrySearch.toLowerCase()))}
          ListEmptyComponent={<Text align="center">No supported countries</Text>}
          ItemSeparatorComponent={() => <View borderBottomColor={'white'} borderWidth={1} marginTop={2} />}
          renderItem={({ item, index, separators }) => {
            const filteredCountries = COUNTRY_DATA.filter(item => item.title.toLowerCase().includes(countrySearch.toLowerCase()))
            return <Pressable
              onPressIn={() => setPreSelectedCountry(item.title)}
              onPressOut={() => setPreSelectedCountry('')}
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
      </SafeAreaView>
    </Pressable>
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