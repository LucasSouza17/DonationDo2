import { StatusBar, View, Text } from 'react-native';
import React, { useEffect, useState } from 'react';
import * as Updates from 'expo-updates'
import Routes from './src/routes'

export default function App() {

  const [update, setUpdate] = useState(false)

  useEffect(() => {
    async function updateApp() {
      const { isAvailable } = await Updates.checkForUpdateAsync()

      if (isAvailable) {
        setUpdate(isAvailable)
        await Updates.fetchUpdateAsync();

        await Updates.reloadAsync();
      }
    }

    updateApp();
  }, [])

  return (
    <>
      {update ? (
        <View style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4F0A83'}}>
          <Text style={{color: 'white', fontSize: 18}}>Atualizando...</Text>
        </View>
      ) : (
          <>
            <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
            <Routes />
          </>
        )}
    </>
  );
}
