/**
 * @format
 */

import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';
import App from './App';

// Register the app with a known name
AppRegistry.registerComponent(appName, () => App);
