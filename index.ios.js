// because index.android.js or index.ios.js can worked in
// react-native-code-push@5.2.0 and bugsnag-react-native@2.5.1,
// but not index.native.js

/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);
