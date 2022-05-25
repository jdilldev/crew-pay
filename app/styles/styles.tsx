import React, { useState } from 'react';
import {
  StyleSheet,
  View as DefaultView,
  Pressable,
  TextInput,
  Text as DefaultText,
  FlexAlignType,
  Dimensions,
} from 'react-native';
import { ButtonProps, LoginType } from '../types';
import { TextProps, ViewProps, useThemeColor, IconProps, IconTypes, IoniconTypes, MaterialIconTypes, ZocialIconTypes, SimpleIconTypes } from '../types';
import { Ionicons, MaterialIcons, SimpleLineIcons, Zocial } from '@expo/vector-icons';

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