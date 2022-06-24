import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import { ColorSchemeName, Appearance } from 'react-native';
import NotFoundScreen from '../screens/NotFoundScreen';
import { AuthPasscode, PreAuth, GetStarted } from '../screens/Login'
import Dashboard from '../screens/Dashboard/Dashboard'

import { RootStackParamList } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import Colors from '../constants/Colors';

const theme = Appearance.getColorScheme()

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  return (
    <NavigationContainer
      linking={LinkingConfiguration}>
      <RootNavigator />
    </NavigationContainer>
  );
}

const Stack = createNativeStackNavigator<RootStackParamList>();

function RootNavigator() {

  const navigationOptions = {
    headerBackTitle: '',
    //headerStyle: { backgroundColor: theme === 'light' ? Colors.light.background : Colors.dark.background },
    headerTintColor: 'limegreen',

  }

  return (
    <Stack.Navigator
    >
      <Stack.Screen name="Root" component={PreAuth} options={{ headerShown: false, ...navigationOptions }} />
      <Stack.Screen name="GetStarted" component={GetStarted} options={{ title: '', headerShown: true, ...navigationOptions }} />
      <Stack.Screen name="AuthPasscode" component={AuthPasscode} options={{ title: 'Verify Code', headerShown: false, ...navigationOptions }} />
      <Stack.Screen name="Dashboard" component={Dashboard} options={{
        ...navigationOptions,
        headerBackVisible: false
      }} />
      <Stack.Screen name="NotFound" component={NotFoundScreen} options={{ title: 'Oops!' }} />
    </Stack.Navigator>
  );
}
