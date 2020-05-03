import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Search from './components/Search'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Institut Firdaws</Text>
      <Search />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
