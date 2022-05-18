import { useTheme, } from '@react-navigation/native';
import { StyleSheet, View as DefaultView, TextInput, Pressable, Text as DefaultText, FlexAlignType } from 'react-native';
import styled from 'styled-components/native'
import { LoginType } from '../types';
import { TextProps, ViewProps, useThemeColor, IconTypes, IoniconTypes, MaterialIconTypes, ZocialIconTypes, SimpleIconTypes } from '../types';
import React from 'react';
import { Ionicons, MaterialIcons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { IconProps } from '../types';

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
    ...otherProps } = props;
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  return <DefaultView style={
    [{
      display: 'flex',
      flexDirection: orientation,
      alignItems: align as FlexAlignType,
      justifyContent: justify,
      // justifyContent: orientation === 'column' ? align : 'flex-start',
      backgroundColor,
      flex
    }, style]} {...otherProps} />;
}

export const Icon = ({ icon, pack, size = 'medium', color, lightColor, darkColor }: IconProps) => {
  let Icon = null;
  let iconColor = color ? color : useThemeColor({ light: lightColor, dark: darkColor }, 'default')

  switch (pack) {
    case 'ion':
      Icon = <Ionicons name={icon as IoniconTypes} size={FontSize[size]} />
      break;
    case 'material':
      Icon = <MaterialIcons name={icon as MaterialIconTypes} />
      break;
    case 'simple':
      Icon = <SimpleLineIcons name={icon as SimpleIconTypes} />
      break;
    case 'zocial':
      Icon = <Zocial name={icon as ZocialIconTypes} />
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


export const PrimaryButton = ({ fullWidth, midWidth, onPress, }: { fullWidth?: boolean, midWidth?: boolean, onPress: () => any }) => {
  const { colors } = useTheme();

  return (
    <Pressable style={{ backgroundColor: colors.primary, borderRadius: 20, paddingHorizontal: midWidth ? 50 : 10, paddingVertical: 4, marginTop: 10, marginBottom: 10, alignSelf: fullWidth ? 'stretch' : 'auto', alignItems: 'center' }}
      onPress={onPress}
    >
      <Text spacing={false} type='anti' size='normalButton' thickness='bold' style={{ fontFamily: 'Avenir' }}>Sign Up</Text>
    </Pressable>
  )
}

export const SecondaryButton = ({ fullWidth, onPress }: { fullWidth?: boolean, onPress: () => any }) => {
  const { colors } = useTheme();

  return (
    <Pressable style={{ borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderColor: '#34658f', borderWidth: 1, marginTop: 10, marginBottom: 10, alignSelf: fullWidth ? 'stretch' : 'auto', alignItems: 'center', }}
      onPress={onPress}
    >
      <Text spacing={false} size='normalButton' thickness="bold" type='primary' style={{ fontFamily: 'Avenir' }}>{'hi'}</Text>
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