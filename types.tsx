
import { Ionicons, MaterialIcons, SimpleLineIcons, Zocial } from '@expo/vector-icons';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { CompositeScreenProps, NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  View as DefaultView,
  Text as DefaultText
} from 'react-native'
import Colors from './constants/Colors';
import useColorScheme from './hooks/useColorScheme';
import { IconThemeProps, TextThemeProps, ViewThemeProps } from './styles/Interfaces';

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList { }
  }
}

declare type ThemeProps = {
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

export enum LoginType { 'PHONE', 'EMAIL' }

export type IconTypes = IoniconTypes | MaterialIconTypes | SimpleIconTypes | ZocialIconTypes;
export type IoniconTypes = keyof typeof Ionicons.glyphMap;
export type MaterialIconTypes = keyof typeof MaterialIcons.glyphMap;
export type SimpleIconTypes = keyof typeof SimpleLineIcons.glyphMap;
export type ZocialIconTypes = keyof typeof Zocial.glyphMap;

export type IconProps = ThemeProps & IconThemeProps;
export type TextProps = ThemeProps & DefaultText['props'] & TextThemeProps;
export type ViewProps = ThemeProps & DefaultView['props'] & ViewThemeProps;

export type RootStackParamList = {
  Root: NavigatorScreenParams<RootTabParamList> | undefined;
  Modal: undefined;
  NotFound: undefined;
  Login: undefined;
  SignUp: undefined;
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
