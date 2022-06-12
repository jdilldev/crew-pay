import { StatusBar } from 'expo-status-bar';
import { CountryCallingCode, CountryCode } from 'libphonenumber-js';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ColorContext } from './GlobalUserSettingsContext';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { LoginType } from './types';
import { QueryClient, QueryClientProvider } from 'react-query';
import RealmContext from './database'

//get RealmProvider from RealmContext created
const { RealmProvider, useRealm } = RealmContext


// query client for react-query
const queryClient = new QueryClient();

/* const syncConfig = {
  user: app?.currentUser,
  partitionValue: 'ExpoTemplate',
}; */


const App = () => {
  //react native default
  const isLoadingComplete = useCachedResources();
  //react native default
  const colorScheme = useColorScheme();

  const [userPhone, setUserPhone] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [countryCode, setCountryCode] = useState<CountryCode>('US')
  const [countryCallingCode, setCountryCallingCode] = useState<CountryCallingCode>('1')
  const [authType, setAuthType] = useState<LoginType>(LoginType.PHONE)
  const [language, setLanguage] = useState('en')

  if (!isLoadingComplete) {
    return null;
  }
  return <RealmProvider /* sync={syncConfig} fallback={() => <LoadingSpinner />} */>
    <QueryClientProvider client={queryClient}>
      <ColorContext.Provider
        value={{ userEmail, userPhone, countryCode, countryCallingCode, authType, setUserEmail, setUserPhone, setCountryCallingCode, setCountryCode, setAuthType }}>
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      </ColorContext.Provider>
    </QueryClientProvider>
  </RealmProvider>
}

export default App;