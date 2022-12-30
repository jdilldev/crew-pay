// import at the very top of everything.
import './ignoreWarnings';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';
import { QueryClient, QueryClientProvider } from 'react-query';
import RealmContext, { APP_ID, User } from './database'
import { AppProvider, UserProvider } from '@realm/react'
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
                subs.add(realm.objects('User'), { name: 'userData' });
                subs.add(realm.objects('Group'), { name: 'userGroups' })
                subs.add(realm.objects('SharedUserInfo'), { name: 'sharedUserData' })
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