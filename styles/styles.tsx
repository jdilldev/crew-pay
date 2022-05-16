import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { StyleSheet, View, TextInput, Pressable, Text } from 'react-native';
import styled from 'styled-components/native'
import { loginType } from '../constants/enums'

const SMALL = 12
const MEDIUM = 24
const LARGE = 40

export const H1 = styled.Text`
  font-size: LARGE;
`
type IoniconTypes = keyof typeof Ionicons.glyphMap;
type MaterialIconTypes = keyof typeof MaterialIcons.glyphMap;


export const IconInput = ({ icon, placeholder, type }: { icon: IoniconTypes | MaterialIconTypes, placeholder: string, type: loginType }) => (
  <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', }}>
    <View style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: "white",
      borderRadius: 25,
      height: 45,
      width: 45,
      shadowColor: 'black',
      shadowOffset: {
        width: -5,
        height: 10
      },
      shadowRadius: 12,
      shadowOpacity: .5
    }}>
      {Object.keys(Ionicons.glyphMap).includes(icon) ?
        <Ionicons name={icon as IoniconTypes} color="black" size={MEDIUM} />
        : <MaterialIcons name={icon as MaterialIconTypes} color="black" size={MEDIUM} />
      }
    </View>
    <TextInput
      placeholder={placeholder}
      style={{ fontSize: MEDIUM, paddingHorizontal: 12 }}
      textContentType={type === loginType.PHONE ? 'telephoneNumber' : 'emailAddress'}
      autoComplete={type === loginType.PHONE ? 'tel-device' : 'email'} />
  </View>
)

export const PrimaryButton = ({ fullWidth, onPress }: { fullWidth?: boolean, onPress: () => any }) => (
  <Pressable style={{ backgroundColor: '#34658f', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, marginTop: 10, marginBottom: 10, alignSelf: fullWidth ? 'stretch' : 'auto', alignItems: 'center' }}
    onPress={onPress}
  >
    <Text style={{ color: 'white', fontWeight: 'bold', fontSize: MEDIUM, fontFamily: 'Avenir', }}>Sign Up</Text>
  </Pressable>
)

export const SecondaryButton = ({ fullWidth, onPress }: { fullWidth?: boolean, onPress: () => any }) => (
  <Pressable style={{ backgroundColor: 'white', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 4, borderColor: '#34658f', borderWidth: 1, marginTop: 10, marginBottom: 10, alignSelf: fullWidth ? 'stretch' : 'auto', alignItems: 'center', }}
    onPress={onPress}
  >
    <Text style={{ color: '#34658f', fontWeight: 'bold', fontSize: MEDIUM, fontFamily: 'Avenir' }}>Log in</Text>
  </Pressable>
)

export default StyleSheet.create({
  h1: {
    fontSize: LARGE,
    fontWeight: 'bold',
  },
  body1: {
    fontSize: MEDIUM
  },
  spacing: {
    marginTop: 10,
    marginBottom: 10
  }
});