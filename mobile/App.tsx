import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>DONATION.DO</Text>
      <Text style={styles.h2}>Começando os trabalhos, preparem-se.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#300C4B',
    alignItems: 'center',
    justifyContent: 'center',
  },
  h1:{
    fontSize: 30,
    color: "#fff",
    fontWeight: "bold"
  },
  h2:{
    fontSize: 15,
    color: "#fff",
    
  }
});
