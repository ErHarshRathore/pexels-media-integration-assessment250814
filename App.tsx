import { StyleSheet } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import AppNavGraph from './src/navigation/AppNavGraph';
import { enableScreens } from 'react-native-screens';

// Enable screens for better navigation performance
enableScreens();

const App = () => {
  console.log('App component has been rendered');

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppNavGraph />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f00',
  },
});

export default App;
