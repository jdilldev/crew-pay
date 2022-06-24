// import at the very top of everything.
import './ignoreWarnings';
import { StatusBar } from 'expo-status-bar';
import { CountryCallingCode, CountryCode } from 'libphonenumber-js';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { LoginType } from './types';
import { QueryClient, QueryClientProvider } from 'react-query';
import RealmContext, { APP_ID, User } from './database'
import { AppProvider, UserProvider } from '@realm/react'
import { Text, View } from './styles/styles';
import { PreAuth } from './screens/Login';
import Dashboard from './screens/Dashboard/Dashboard';

//get RealmProvider from RealmContext created
const { RealmProvider, useRealm } = RealmContext


// query client for react-query
const queryClient = new QueryClient();



const App = () => {
  //react native default
  const isLoadingComplete = useCachedResources();
  //react native default
  const colorScheme = useColorScheme();

  if (!isLoadingComplete) {
    return null;
  }



  return <QueryClientProvider client={queryClient}>
    <AppProvider id={APP_ID}>
      <UserProvider fallback={
        <SafeAreaProvider>
          <Navigation colorScheme={colorScheme} />
          <StatusBar />
        </SafeAreaProvider>
      }>
        <RealmProvider
          deleteRealmIfMigrationNeeded={true}
          sync={{
            flexible: true,

            initialSubscriptions: {
              update: (subs, realm) => {
                subs.add(realm.objects('User'));
                subs.add(realm.objects('Group'))
              },
              rerunOnOpen: true,
            }
          }}>
          <Dashboard />
        </RealmProvider>
      </UserProvider>
    </AppProvider>
  </QueryClientProvider>
}

export default App;