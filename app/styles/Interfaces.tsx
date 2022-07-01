import { ViewStyle } from "react-native"
import { IconPacks, IconProps, IconTypes } from "../types"

export interface TextThemeProps {
    type?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'anti'
    size?: 'large' | 'medium' | 'small' | 'smallButton' | 'normalButton' | 'largeButton' | 'default'
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
    pack: IconPacks
    size?: 'large' | 'medium' | 'small'
    color?: string,
    style?: ViewStyle
    pressable?: boolean,
    onPress?: () => void
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

