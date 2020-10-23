import { StatusBar } from 'react-native';
import React from 'react';
import Routes from './src/routes'
import { enableScreens } from 'react-native-screens'

enableScreens();

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
      <Routes />
    </>
  );
}
