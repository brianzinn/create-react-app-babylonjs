import {AppRegistry} from 'react-native';
import App from './App';

// import {name as appName} from './app.json';
// with webpack@5 , above will cause `Should not import the named export 'name' (imported as 'appName') from
// default-exporting module (only default export is available soon)` , ref to
// https://stackoverflow.com/questions/64993118/error-should-not-import-the-named-export-version-imported-as-version
// so use below instead
import appInfo from './app.json';

AppRegistry.registerComponent(appInfo.name, () => App);

AppRegistry.runApplication(appInfo.name, {
  rootTag: document.getElementById('root'),
});
