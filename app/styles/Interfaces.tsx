import { ReactNode } from "react"
import { ViewStyle } from "react-native"
import { IconPacks, VectorProps, IconTypes } from "../types"

type IndicatorType = 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'anti' | 'focused' | 'divider' | 'pending'

export interface TextThemeProps {
    type?: IndicatorType
    size?: 'large' | 'medium' | 'small' | 'smallButton' | 'normalButton' | 'largeButton' | 'default'
    align?: 'center' | 'left' | 'right' | 'justify'
    spacing?: boolean,
    customColor?: string,
}

export interface ViewThemeProps {
    flex?: number,
    spacing?: boolean
    wrap?: boolean
    transparent?: boolean
}

interface IconBasics {
    type?: IndicatorType,
    color?: string,
    style?: ViewStyle
    pressable?: boolean,
    onPress?: () => void
}


interface ExpoVector extends IconBasics {
    name: IconTypes
    pack: IconPacks
    size?: number
}

interface SvgVector extends IconBasics {
    name: string
    pack?: never
    size?: never
    width?: number | string,
    height?: number | string,
}

export type VectorThemeProps = ExpoVector | SvgVector

export interface ButtonThemeProps {
    onPress: () => any
    text: string
    icon?: VectorProps
    iconPosition?: 'start' | 'end'
    weight?: '200' | '300' | 'normal' | 'bold'
    size?: 'largeButton' | 'normalButton' | 'smallButton'
    type?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'anti'
    shape?: 'rounded' | 'oval' | 'square'
    fullWidth?: boolean,
    customColor?: string
    capitalized?: boolean
    elevated?: boolean
    outlined?: boolean
    style?: ViewStyle
}

