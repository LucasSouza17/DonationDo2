import { StatusBar } from 'react-native';
import React from 'react';

import Routes from './src/routes'

export default function App() {
  return (
    <>
      <StatusBar backgroundColor="#300C4B" translucent barStyle="light-content" />
      <Routes />
    </>
  );
}
