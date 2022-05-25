import { ViewStyle } from "react-native"
import { IconProps, IconTypes } from "../types"

export interface TextThemeProps {
    type?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'anti'
    size?: 'large' | 'medium' | 'small' | 'smallButton' | 'normalButton' | 'largeButton' | 'default'
    thickness?: 'ultralight' | 'light' | 'normal' | 'bold' | 'thickkk'
    align?: 'center' | 'left' | 'right' | 'justify'
    spacing?: boolean,
    customColor?: string,
}

export interface ViewThemeProps {
    orientation?: 'row' | 'column'
    align?: 'center' | 'left' | 'right'
    justify?: 'center' | 'flex-start' | 'flex-end' | 'space-between' | 'space-around' | 'space-evenly'
    flex?: number,
    spacing?: boolean
    wrap?: boolean
    transparent?: boolean
}

export interface IconThemeProps {
    icon: IconTypes
    pack: 'ion' | 'material' | 'simple' | 'zocial'
    size?: 'large' | 'medium' | 'small'
    color?: string,
    style?: ViewStyle
}

export interface ButtonThemeProps {
    onPress: () => any
    text: string,
    icon?: IconProps,
    iconPosition?: 'start' | 'end'
    size?: 'largeButton' | 'normalButton' | 'smallButton'
    type?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'anti'
    shape?: 'rounded' | 'oval' | 'square'
    width?: 'full' | 'medium',
    customColor?: string
    capitalized?: boolean
    elevated?: boolean
    outlined?: boolean
    style?: ViewStyle
}

