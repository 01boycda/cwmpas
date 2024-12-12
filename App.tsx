import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import Navigator from './Navigator';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { COLORS } from './setters/styles';

const App = () => {
  const [loaded, error] = useFonts({
    'Roboto-Bold': require('./assets/fonts/Roboto-Bold.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <View style={styles.appContainer}>
      <SafeAreaView style={styles.appContainer}>
        <Navigator />
      </SafeAreaView>
      <StatusBar style="light" />
    </View>
  )
}

export default App;

const styles = StyleSheet.create({
  appContainer: {
    backgroundColor: COLORS.black,
    flex: 1,
  }
})