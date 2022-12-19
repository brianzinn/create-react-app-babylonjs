/**
 * GCanvas React Native Examples
 * https://github.com/flyskywhy/react-native-gcanvas
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Button, Platform, StyleSheet, View, StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Canvas2dDemoScreen from './app/components/Canvas2dDemo';
import Webgl3dTexturesScreen from './app/components/Webgl3dTextures';
import WebglCubeMapsScreen from './app/components/WebglCubeMaps';
import DragNDropScreen from './src/dragNdrop';
import NonDeclarativeScreen from './src/nonDeclarative';

if (Platform.OS !== 'web') {
  require('react-native').LogBox.ignoreLogs([
    'React Components must start with an uppercase letter',
  ]);
}

function HomeScreen({navigation}) {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Button
        title="Canvas 2d Demo"
        onPress={() => navigation.navigate('Canvas2dDemo')}
      />
      <Button
        title="Webgl 3d Textures"
        onPress={() => navigation.navigate('Webgl3dTextures')}
      />
      <Button
        title="Webgl Cube Maps"
        onPress={() => navigation.navigate('WebglCubeMaps')}
      />
      <Button
        title="babylonjs Drag and drop"
        onPress={() => navigation.navigate('DragNDrop')}
      />
      <Button
        title="babylonjs Non-Declarative"
        onPress={() => navigation.navigate('NonDeclarative')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

const App: () => React$Node = () => {
  return (
    <NavigationContainer>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'GCanvas React Native Examples'}}
        />
        <Stack.Screen
          name="Canvas2dDemo"
          component={Canvas2dDemoScreen}
          options={{title: 'Canvas 2d Demo'}}
        />
        <Stack.Screen
          name="Webgl3dTextures"
          component={Webgl3dTexturesScreen}
          options={{title: 'Webgl 3d Textures'}}
        />
        <Stack.Screen
          name="WebglCubeMaps"
          component={WebglCubeMapsScreen}
          options={{title: 'Webgl Cube Maps'}}
        />
        <Stack.Screen
          name="DragNDrop"
          component={DragNDropScreen}
          options={{title: 'Drag and drop'}}
        />
        <Stack.Screen
          name="NonDeclarative"
          component={NonDeclarativeScreen}
          options={{title: 'Non-Declarative'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: 'grey',
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: 'white',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: 'black',
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: 'black',
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
