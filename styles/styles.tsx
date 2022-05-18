import React from 'react';
import {
  StyleSheet,
  View as DefaultView,
  Pressable,
  TextInput,
  Text as DefaultText, FlexAlignType
} from 'react-native';
import styled from 'styled-components/native'
import { ButtonProps, LoginType } from '../types';
import { TextProps, ViewProps, useThemeColor, IconProps, IconTypes, IoniconTypes, MaterialIconTypes, ZocialIconTypes, SimpleIconTypes } from '../types';
import { Ionicons, MaterialIcons, SimpleLineIcons, Zocial } from '@expo/vector-icons';

const FontSize = {
  'small': 12,
  'medium': 24,
  'large': 42,
  'default': 17,
  'smallButton': 10,
  'normalButton': 20,
  'largeButton': 30
}

const TextWeight = {
  'ultralight': "100",
  'light': "200",
  'normal': "300",
  'bold': "700",
  'thickkk': '900',
} as const;

export const h1 = styled.Text`
  font-size: 42;
`

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
    spacing = false,
    ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={
    [{
      display: 'flex',
      flexDirection: orientation,
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
      Icon = <MaterialIcons name={icon as MaterialIconTypes} color={iconColor} />
      break;
    case 'simple':
      Icon = <SimpleLineIcons name={icon as SimpleIconTypes} color={iconColor} />
      break;
    case 'zocial':
      Icon = <Zocial name={icon as ZocialIconTypes} color={iconColor} />
      break;
  }

  return Icon;
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


export const Button = ({
  onPress,
  text,
  outlined,
  shape = 'rounded',
  size = 'normalButton',
  disabled,
  capitalized,
  customColor,
  elevated,
  width,
  type = 'default',
  lightColor,
  darkColor
}: ButtonProps) => {
  let color = customColor ? customColor : useThemeColor({ light: lightColor, dark: darkColor }, type)
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background')
  let buttonTextColor = outlined ? color : backgroundColor
  let buttonBackgroundColor = outlined ? backgroundColor : color;



  const Shape = {
    'rounded': 7,
    'oval': 20,
    'square': 0,
  }

  return (
    <Pressable
      onPress={onPress}
      style={{
        marginHorizontal: width === 'medium' ? 50 : 0,
        backgroundColor: buttonBackgroundColor,
        borderColor: outlined ? color : buttonBackgroundColor,
        borderWidth: 2,
        borderRadius: Shape[shape]
      }} >
      <Text thickness='bold' align='center' type={type} customColor={buttonTextColor} size={size}>{text}</Text>
    </Pressable>
  )
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