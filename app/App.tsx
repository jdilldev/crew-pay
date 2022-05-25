import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import useCachedResources from './hooks/useCachedResources';
import useColorScheme from './hooks/useColorScheme';
import Navigation from './navigation';


const App = () => {
  const isLoadingComplete = useCachedResources();
  const colorScheme = useColorScheme();
  const [token, setToken] = useState(false);

  if (!isLoadingComplete) {
    return null;
  }
  return <SafeAreaProvider>
    <Navigation colorScheme={colorScheme} />
    <StatusBar />
  </SafeAreaProvider>

}

export default App;