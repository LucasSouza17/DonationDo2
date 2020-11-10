import { StatusBar } from 'react-native';
import React from 'react';
import Routes from './src/routes'

export default function App() {

  return (
    <>
      <StatusBar backgroundColor="transparent" translucent barStyle="light-content" />
      <Routes />
    </>
  );
}
