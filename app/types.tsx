
import { Ionicons, MaterialIcons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  View as DefaultView,
  Text as DefaultText,
  TextInput as DefaultTextInput,
  TextInputProps as DefaultTextInputProps,
  Button as DefaultButton,
  ViewStyle,
  PressableProps,
  TextStyle
} from 'react-native'
import Colors from './constants/Colors';
import useColorScheme from './hooks/useColorScheme';
import { ButtonThemeProps, VectorThemeProps, TextThemeProps, ViewThemeProps } from './styles/Interfaces';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

export type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export const useThemeColor = (
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) => {
  const theme = useColorScheme();
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export enum LoginType { 'PHONE', 'EMAIL', 'GMAIL' }

export type ApplicationInput = {
  name: string;
  dob: string;
};


export type IconTypes = IoniconTypes | MaterialIconTypes | SimpleIconTypes | ZocialIconTypes;

export type IconPacks = 'ion' | 'material' | 'simple' | 'zocial'
export type IoniconTypes = keyof typeof Ionicons.glyphMap;
export type MaterialIconTypes = keyof typeof MaterialIcons.glyphMap;
export type SimpleIconTypes = keyof typeof SimpleLineIcons.glyphMap;
export type ZocialIconTypes = keyof typeof Zocial.glyphMap;

export type VectorProps = ThemeProps & ViewStyle & VectorThemeProps;
export type TextProps = ThemeProps & DefaultText['props'] & TextStyle & TextThemeProps;
export type ViewProps = ThemeProps & DefaultView['props'] & ViewStyle & ViewThemeProps;
export type ButtonProps = ThemeProps & PressableProps & ButtonThemeProps;
export type TextInputProps = ThemeProps & DefaultTextInput['props']

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Login: undefined;
  GetStarted: undefined;
  AuthPasscode: { methodID: string, userID: string };
  Dashboard: undefined;
};

export type RootStackScreenProps<Screen extends keyof RootStackParamList> = NativeStackScreenProps<
  RootStackParamList,
  Screen
>;

export type RootTabParamList = {
  TabOne: undefined;
  TabTwo: undefined;
};

export type RootTabScreenProps<Screen extends keyof RootTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<RootTabParamList, Screen>,
  NativeStackScreenProps<RootStackParamList>
>;
