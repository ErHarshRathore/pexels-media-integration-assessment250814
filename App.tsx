import { SafeAreaProvider, useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavGraph from './src/navigation/AppNavGraph';
import { enableScreens } from 'react-native-screens';
import { StatusBar, StyleSheet, View } from 'react-native';

// Enable screens for better navigation performance
enableScreens();

const App = () => {
  return (
    <SafeAreaProvider style={styles.appWindowContainer}>
      <StatusBar barStyle='dark-content'/>
      <StatusBarOverlay />
      <NavigationBarOverlay />
      <NavigationContainer>
        <AppNavGraph />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const StatusBarOverlay = () => {
  return <View style={[
    styles.systemBarOverlay, 
    styles.statusBarAlignment,
    { height: useSafeAreaInsets().top },
  ]}/>
}

const NavigationBarOverlay = () => {
  return <View style={[
    styles.systemBarOverlay,
    styles.navigationBarAlignment,
    { height: useSafeAreaInsets().bottom },
  ]}/>
}

const styles = StyleSheet.create({
  appWindowContainer: {
    flex: 1,
    backgroundColor: '#fff',
  },
  systemBarOverlay: { 
    backgroundColor: '#fff8',
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  statusBarAlignment: {
    top: 0,
  },
  navigationBarAlignment: {
    bottom: 0,
  },
})

export default App;
