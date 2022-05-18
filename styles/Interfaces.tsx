import { IconTypes } from "../types"

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
    flex?: number
}

export interface IconThemeProps {
    icon: IconTypes
    pack: 'ion' | 'material' | 'simple' | 'zocial'
    size?: 'large' | 'medium' | 'small',
    color?: string
}