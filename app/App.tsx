import { StatusBar } from 'expo-status-bar';
import { CountryCallingCode, CountryCode } from 'libphonenumber-js';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
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

  if (!isLoadingComplete) {
    return null;
  }
  return <RealmProvider /* sync={syncConfig} fallback={() => <LoadingSpinner />} */>
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <Navigation colorScheme={colorScheme} />
        <StatusBar />
      </SafeAreaProvider>
    </QueryClientProvider>
  </RealmProvider>
}

export default App;